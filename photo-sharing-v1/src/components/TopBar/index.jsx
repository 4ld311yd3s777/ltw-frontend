

// import React, { useEffect, useState } from "react";
// import { AppBar, Toolbar, Typography, Box } from "@mui/material";
// import { useLocation, useParams } from "react-router-dom";

// import "./styles.css";
// import models from "../../modelData/models";

// /**
//  * Define TopBar, a React component of Project 4.
//  */
// function TopBar() {
//   const myName = "PHUNG HAI NAM";
//   const location = useLocation();
//   const params = useParams();
//   const [context, setContext] = useState("Welcome");

//   useEffect(() => {
//     const path = location.pathname;

//     const updateContext = () => {
//       if (path.startsWith("/users/") && !path.includes("/photos/")) {
//         const userId = params.userId || path.split("/")[2];
//         const user = models.userModel(userId);
//         if (user) {
//           setContext(user.first_name + " " + user.last_name);
//         }
//       } else if (path.startsWith("/photos/")) {
//         const userId = params.userId || path.split("/")[2];
//         const user = models.userModel(userId);
//         if (user) {
//           setContext("Photos of " + user.first_name + " " + user.last_name);
//         }
//       } else {
//         setContext("Welcome");
//       }
//     };

//     updateContext();
//   }, [location]);

//   return (
//     <AppBar className="topbar-appBar" position="absolute">
//       <Toolbar sx={{ justifyContent: "space-between" }}>
//         <Typography variant="h6" color="inherit">
//           {myName}
//         </Typography>
//         <Typography variant="h6" color="inherit">
//           {context}
//         </Typography>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default TopBar;

import React, { useEffect, useRef, useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

function TopBar() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const [context, setContext] = useState("Welcome");
  const [loggedInUserFirstName, setLoggedInUserFirstName] = useState(null);
  const fileInputRef = useRef(null); // Dùng để trigger chọn file ảnh

  const updateUserInfo = () => {
    const userToken = localStorage.getItem("userToken");
    const userFirstName = localStorage.getItem("userFirstName");
    if (userToken && userFirstName) {
      setLoggedInUserFirstName(userFirstName);
    } else {
      setLoggedInUserFirstName(null);
    }
  };

  useEffect(() => {
    updateUserInfo();
    window.addEventListener("userStateChanged", updateUserInfo);
    return () => {
      window.removeEventListener("userStateChanged", updateUserInfo);
    };
  }, []);

  useEffect(() => {
    const path = location.pathname;
    let newContext = "Welcome";

    if (path.startsWith("/users/") && !path.includes("/photos/")) {
      const userId = params.userId;
      const user = models.userModel(userId);
      if (user) {
        newContext = user.first_name + " " + user.last_name;
      }
    } else if (path.startsWith("/photos/")) {
      const userId = params.userId;
      const user = models.userModel(userId);
      if (user) {
        newContext = "Photos of " + user.first_name + " " + user.last_name;
      }
    } else if (path.includes("/loginregister")) {
      const query = new URLSearchParams(location.search);
      const mode = query.get("mode");
      newContext = mode === "register" ? "Register" : "Login";
    }

    setContext(newContext);
  }, [location, params]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("user");
    setLoggedInUserFirstName(null);
    window.dispatchEvent(new Event("userStateChanged"));
    navigate("/");
  };

  const handleAddPhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Kích hoạt hộp chọn file
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("photo", file);

      const response = await fetch("http://localhost:3001/photos/new", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Tải ảnh thất bại từ server");
      }

      const result = await response.json();
      alert("Ảnh đã được thêm thành công!");

      const userId = localStorage.getItem("userToken");
      if (userId) {
        navigate(`/photos/${userId}`);
      }
    } catch (err) {
      console.error("Lỗi khi tải ảnh:", err);
      alert("Tải ảnh thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" color="inherit">
          {loggedInUserFirstName ? `Hi ${loggedInUserFirstName}` : "Please log in"}
        </Typography>

        <Typography
          variant="h6"
          color="inherit"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          {context}
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {loggedInUserFirstName && (
            <>
              <Button color="inherit" onClick={handleAddPhotoClick}>
                Add Photo
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Đăng xuất
              </Button>
              {/* Ẩn input file, dùng ref để trigger chọn ảnh */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
