// import './App.css';

// import React from "react";
// import { Grid, Typography, Paper } from "@mui/material";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import TopBar from "./components/TopBar";
// import UserDetail from "./components/UserDetail";
// import UserList from "./components/UserList";
// import UserPhotos from "./components/UserPhotos";
// import LoginRegister from './components/LoginRegister';

// const App = (props) => {
//   return (
//       <Router>
//         <div>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TopBar />
//             </Grid>
//             <div className="main-topbar-buffer" />
//             <Grid item sm={3}>
//               <Paper className="main-grid-item">
//                 <UserList />
//               </Paper>
//             </Grid>
//             <Grid item sm={9}>
//               <Paper className="main-grid-item">
//                 <Routes>
//                   <Route
//                       path="/users/:userId"
//                       element = {<UserDetail />}
//                   />
//                   <Route
//                       path="/photos/:userId"
//                       element = {<UserPhotos />}
//                   />
//                   <Route path="/users" element={<UserList />} />
//                   <Route path="/loginregister" element={<LoginRegister/>}/>

//                 </Routes>
//               </Paper>
//             </Grid>
//           </Grid>
//         </div>
//       </Router>
//   );
// }

// export default App;
 
import './App.css';

import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from './components/LoginRegister';

const AppContent = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = () => {
    const userToken = localStorage.getItem("userToken");
    const userFirstName = localStorage.getItem("userFirstName");
    setIsLoggedIn(!!userToken && !!userFirstName);
  };

  useEffect(() => {
    checkLogin();
    window.addEventListener("userStateChanged", checkLogin);
    return () => {
      window.removeEventListener("userStateChanged", checkLogin);
    };
  }, [location]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TopBar />
      </Grid>

      <div className="main-topbar-buffer" />

      {isLoggedIn ? (
        <>
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>

          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route path="/photos/:userId" element={<UserPhotos />} />
                <Route path="/users" element={<UserList />} />
          
              </Routes>
            </Paper>
          </Grid>
        </>
      ) : (
        <Grid item sm={12}>
          <Paper className="main-grid-item">
            <Routes>
              <Route path="/loginregister" element={<LoginRegister />} />
              <Route path="*" element={<Navigate to="/loginregister?mode=login" />} />
            </Routes>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

