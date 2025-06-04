// import React from "react";
// import { Typography } from "@mui/material";

// import "./styles.css";
// import {useParams} from "react-router-dom";

// /**
//  * Define UserPhotos, a React component of Project 4.
//  */
// function UserPhotos () {
//     const user = useParams();
//     return (
//       <Typography variant="body1">
//         This should be the UserPhotos view of the PhotoShare app. Since it is
//         invoked from React Router the params from the route will be in property
//         match. So this should show details of user:
//         {user.userId}. You can fetch the model for the user
//         from models.photoOfUserModel(userId):
//       </Typography>
//     );
// }

// export default UserPhotos;
import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Link,
} from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);

  if (!photos || photos.length === 0) {
    return (
      <Typography variant="body1">
        No photos found for this user.
      </Typography>
    );
  }

  return (
    <div>
      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginBottom: 24 }}>
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`}
            alt="User photo"
            style={{ maxWidth: "100%", maxHeight: "500px" }}
          />
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              Posted on: {new Date(photo.date_time).toLocaleString()}
            </Typography>
            <Divider style={{ margin: "12px 0" }} />
            <Typography variant="subtitle1">Comments:</Typography>

            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((comment) => (
                <div key={comment._id} style={{ marginBottom: 12 }}>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(comment.date_time).toLocaleString()} -{" "}
                    <Link
                      component={RouterLink}
                      to={`/users/${comment.user._id}`}
                    >
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>
                  </Typography>
                  <Typography variant="body1">{comment.comment}</Typography>
                </div>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No comments.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;

