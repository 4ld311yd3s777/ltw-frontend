

// import React, { useState, useEffect } from "react"; // 1. Import useState và useEffect
// import {
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   Divider,
//   Link,
// } from "@mui/material";
// import { useParams, Link as RouterLink } from "react-router-dom";

// import "./styles.css";
// // import models from "../../modelData/models"; // 2. Xóa hoặc comment dòng này
// import fetchModel from "../../lib/fetchModelData"; // 3. Import hàm fetchModel của bạn

// /**
//  * Define UserPhotos, a React component of Project 4.
//  */
// function UserPhotos() {
//   const { userId } = useParams(); // Lấy userId từ URL

//   // 4. Khởi tạo state để lưu trữ ảnh và thông tin người dùng
//   const [photos, setPhotos] = useState([]);
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null); // (Tùy chọn) Thêm state để xử lý lỗi
//   const [isLoading, setIsLoading] = useState(true); // (Tùy chọn) Thêm state để theo dõi trạng thái tải

//   // 5. Sử dụng useEffect để gọi các API khi component được mount hoặc khi userId thay đổi.
//   useEffect(() => {
//     async function fetchUserPhotosAndDetails() {
//       try {
//         setIsLoading(true); // Bắt đầu tải dữ liệu
//         setError(null); // Xóa lỗi cũ

//         // Gọi API để lấy thông tin người dùng
//         const userData = await fetchModel(`/user/${userId}`);
//         setUser(userData);

//         // Gọi API để lấy ảnh của người dùng
//         const photosData = await fetchModel(`/photosOfUser/${userId}`);
//         setPhotos(photosData);

//       } catch (err) {
//         console.error(`Lỗi khi lấy ảnh hoặc chi tiết người dùng ${userId}:`, err);
//         setError("Không thể tải ảnh hoặc thông tin người dùng. Vui lòng thử lại sau.");
//         setUser(null); // Đặt user về null nếu có lỗi
//         setPhotos([]); // Đặt photos về mảng rỗng nếu có lỗi
//       } finally {
//         setIsLoading(false); // Kết thúc tải dữ liệu
//       }
//     }

//     fetchUserPhotosAndDetails(); // Gọi hàm fetch dữ liệu ngay lập tức

//   }, [userId]); // [userId] là dependency array. Hàm sẽ chạy lại mỗi khi userId thay đổi.


//   // 6. Xử lý trạng thái tải và lỗi
//   if (isLoading) {
//     return (
//       <Typography variant="body1" align="center" style={{ marginTop: 20 }}>
//         User's info loading
//       </Typography>
//     );
//   }

//   if (error) {
//     return (
//       <Typography variant="body1" color="error" align="center" style={{ marginTop: 20 }}>
//         {error}
//       </Typography>
//     );
//   }

//   // 7. Hiển thị thông báo nếu không tìm thấy người dùng hoặc không có ảnh
//   if (!user) {
//     return <Typography variant="body1">User not found</Typography>;
//   }

//   if (!photos || photos.length === 0) {
//     return (
//       <Typography variant="body1">
//         No photo found for {user.first_name} {user.last_name}.
//       </Typography>
//     );
//   }

//   // 8. Render giao diện người dùng dựa trên dữ liệu trong state 'photos' và 'user'.
//   return (
//     <div>
//       <Typography variant="h5" gutterBottom>
//         Photos of {user.first_name} {user.last_name}
//       </Typography>
//       {photos.map((photo) => (
//         <Card key={photo._id} style={{ marginBottom: 24 }}>
//           <CardMedia
//             component="img"
//             image={`/images/${photo.file_name}`}
//             alt={`${user.first_name}'s photo`} // Sử dụng tên người dùng từ state 'user'

//             style={{ maxWidth: "100%", maxHeight: "500px" }}
//           />
//           <CardContent>
//             <Typography variant="subtitle2" color="textSecondary">
//               Posted on: {new Date(photo.date_time).toLocaleString()}
//             </Typography>
//             <Divider style={{ margin: "12px 0" }} />
//             <Typography variant="subtitle1">Comment:</Typography>

//             {photo.comments && photo.comments.length > 0 ? (
//               photo.comments.map((comment) => (
//                 <div key={comment._id} style={{ marginBottom: 12 }}>
//                   <Typography variant="body2" color="textSecondary">
//                     {new Date(comment.date_time).toLocaleString()} -{" "}
//                     <Link
//                       component={RouterLink}
//                       to={`/users/${comment.user._id}`}
//                     >
//                       {/* Đảm bảo comment.user có đủ thông tin first_name/last_name */}
//                       {comment.user.first_name} {comment.user.last_name}
//                     </Link>
//                   </Typography>
//                   <Typography variant="body1">{comment.comment}</Typography>
//                 </div>
//               ))
//             ) : (
//               <Typography variant="body2" color="textSecondary">
//                 No comment.
//               </Typography>
//             )}
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }

// export default UserPhotos;
import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Link,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos() {
  const { userId } = useParams();

  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Lấy thông tin đăng nhập người dùng hiện tại (nếu có)
  const loggedInUserFirstName = localStorage.getItem("userFirstName");
  const loggedInUserId = JSON.parse(localStorage.getItem("user"))?._id;

  // State cho từng ô nhập bình luận - lưu comment theo photoId
  const [newComments, setNewComments] = useState({});

  // Hàm load lại dữ liệu người dùng và ảnh + bình luận
  async function fetchUserPhotosAndDetails() {
    try {
      setIsLoading(true);
      setError(null);

      const userData = await fetchModel(`/user/${userId}`);
      setUser(userData);

      const photosData = await fetchModel(`/photosOfUser/${userId}`);
      setPhotos(photosData);
    } catch (err) {
      console.error(err);
      setError("Không thể tải ảnh hoặc thông tin người dùng. Vui lòng thử lại sau.");
      setUser(null);
      setPhotos([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserPhotosAndDetails();
  }, [userId]);

  // Xử lý thay đổi nội dung ô nhập bình luận theo photoId
  const handleCommentChange = (photoId, value) => {
    setNewComments((prev) => ({
      ...prev,
      [photoId]: value,
    }));
  };

  // Xử lý gửi bình luận
  const handleAddComment = async (photoId) => {
    const commentText = newComments[photoId];
    if (!commentText || commentText.trim() === "") {
      alert("Vui lòng nhập nội dung bình luận.");
      return;
    }

    try {
      // Gọi API thêm bình luận (giả lập hoặc thực tế)
      // Giả lập API POST comment, ví dụ:
      // await fetchModel(`/commentsOfPhoto/${photoId}`, {
      //   method: "POST",
      //   body: JSON.stringify({ comment: commentText }),
      // });

      // Ở đây giả lập thành công với timeout
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Sau khi thêm thành công, reset ô nhập và tải lại dữ liệu
      setNewComments((prev) => ({
        ...prev,
        [photoId]: "",
      }));

      await fetchUserPhotosAndDetails();
    } catch (err) {
      alert("Thêm bình luận thất bại. Vui lòng thử lại.");
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <Typography variant="body1" align="center" style={{ marginTop: 20 }}>
        User's info loading
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" color="error" align="center" style={{ marginTop: 20 }}>
        {error}
      </Typography>
    );
  }

  if (!user) {
    return <Typography variant="body1">User not found</Typography>;
  }

  if (!photos || photos.length === 0) {
    return (
      <Typography variant="body1">
        No photo found for {user.first_name} {user.last_name}.
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Photos of {user.first_name} {user.last_name}
      </Typography>

      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginBottom: 24 }}>
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`}
            alt={`${user.first_name}'s photo`}
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
                <Box key={comment._id} mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(comment.date_time).toLocaleString()} -{" "}
                    <Link component={RouterLink} to={`/users/${comment.user._id}`}>
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>
                  </Typography>
                  <Typography variant="body1">{comment.comment}</Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No comment.
              </Typography>
            )}

            {/* Nếu đã đăng nhập mới hiện phần nhập bình luận */}
            {loggedInUserFirstName && loggedInUserId ? (
              <Box mt={2} display="flex" gap={1} alignItems="center">
                <TextField
                  label={`Add a comment to this photo`}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={newComments[photo._id] || ""}
                  onChange={(e) => handleCommentChange(photo._id, e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={() => handleAddComment(photo._id)}
                  disabled={!newComments[photo._id] || newComments[photo._id].trim() === ""}
                >
                  Send
                </Button>
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary" mt={2}>
                Please login to add comments.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
