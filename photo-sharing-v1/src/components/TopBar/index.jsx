// import React from "react";
// import { AppBar, Toolbar, Typography } from "@mui/material";

// import "./styles.css";

// /**
//  * Define TopBar, a React component of Project 4.
//  */
// function TopBar () {
//     return (
//       <AppBar className="topbar-appBar" position="absolute">
//         <Toolbar>
//           <Typography variant="h5" color="inherit">
//             This is the TopBar component
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     );
// }

// export default TopBar;

import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const myName = "PHUNG HAI NAM";
  const location = useLocation();
  const params = useParams();
  const [context, setContext] = useState("Welcome");

  useEffect(() => {
    const path = location.pathname;

    const updateContext = () => {
      if (path.startsWith("/users/") && !path.includes("/photos/")) {
        const userId = params.userId || path.split("/")[2];
        const user = models.userModel(userId);
        if (user) {
          setContext(user.first_name + " " + user.last_name);
        }
      } else if (path.startsWith("/photos/")) {
        const userId = params.userId || path.split("/")[2];
        const user = models.userModel(userId);
        if (user) {
          setContext("Photos of " + user.first_name + " " + user.last_name);
        }
      } else {
        setContext("Welcome");
      }
    };

    updateContext();
  }, [location]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" color="inherit">
          {myName}
        </Typography>
        <Typography variant="h6" color="inherit">
          {context}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;




 

