// import React from "react";
// import {
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
// } from "@mui/material";

// import "./styles.css";
// import models from "../../modelData/models";

// /**
//  * Define UserList, a React component of Project 4.
//  */
// function UserList () {
//     const users = models.userListModel();
//     return (
//       <div>
//         <Typography variant="body1">
//           User list <a href="https://mui.com/components/lists/">Lists</a>{" "}
//           and <a href="https://mui.com/components/dividers/">Dividers</a> to
//           display your users like so:
//         </Typography>
//         <List component="nav">
//           {users.map((item) => (
//             <>
//               <ListItem>
//                       <ListItemText primary={item.first_name} />
//               </ListItem>
//               <Divider />
//             </>
//           ))}
//         </List>
//         <Typography variant="body1">
//           The model comes in from models.userListModel()
//         </Typography>
//       </div>
//     );
// }

// export default UserList;


import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const users = models.userListModel();
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        User List
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem
              button
              component={Link}
              to={`/users/${item._id}`}
            >
              <ListItemText primary={`${item.first_name} ${item.last_name}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;

