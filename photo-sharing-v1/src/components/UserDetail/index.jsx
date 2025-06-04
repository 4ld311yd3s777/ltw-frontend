// import React from "react";
// import {Typography} from "@mui/material";

// import "./styles.css";
// import {useParams} from "react-router-dom";

// /**
//  * Define UserDetail, a React component of Project 4.
//  */
// function UserDetail() {
//     const user = useParams();
//     return (
//         <>
//           <Typography variant="body1">
//             This should be the UserDetail view of the PhotoShare app. Since it is
//             invoked from React Router the params from the route will be in property match.
//             So this should show details of user: {user.userId}.
//             You can fetch the model for the user from models.userModel.
//           </Typography>
//         </>
//     );
// }

// export default UserDetail;


import React from "react";
import { Typography, Link, Paper } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) {
    return <Typography variant="body1">User not found.</Typography>;
  }

  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <Typography variant="h5" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body1">
        <strong>Location:</strong> {user.location}
      </Typography>
      <Typography variant="body1">
        <strong>Description:</strong> {user.description}
      </Typography>
      <Typography variant="body1">
        <strong>Occupation:</strong> {user.occupation}
      </Typography>
      <Typography variant="body1" style={{ marginTop: 16 }}>
        <Link component={RouterLink} to={`/photos/${userId}`}>
          View Photos of {user.first_name}
        </Link>
      </Typography>
    </Paper>
  );
}

export default UserDetail;


 

