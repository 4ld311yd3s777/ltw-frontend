

 
import React, { useState, useEffect } from "react"; // 1. Import useState và useEffect
import { Typography, Link, Paper } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";

import "./styles.css";
// import models from "../../modelData/models"; // 2. Xóa hoặc comment dòng này
import fetchModel from "../../lib/fetchModelData"; // 3. Import hàm fetchModel của bạn

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams(); // Lấy userId từ URL
  
  // 4. Khởi tạo state để lưu trữ thông tin người dùng.
  // Ban đầu, nó có thể là null hoặc một đối tượng rỗng.
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // (Tùy chọn) Thêm state để xử lý lỗi
  const [isLoading, setIsLoading] = useState(true); // (Tùy chọn) Thêm state để theo dõi trạng thái tải

  // 5. Sử dụng useEffect để gọi API khi component được mount hoặc khi userId thay đổi.
  useEffect(() => {
    async function fetchUserDetail() {
      try {
        setIsLoading(true); // Bắt đầu tải dữ liệu
        // Gọi hàm fetchModel với endpoint /user/:userId
        const userData = await fetchModel(`/user/${userId}`);
        setUser(userData); // Cập nhật state 'user' với dữ liệu nhận được
        setError(null); // Xóa lỗi nếu có
      } catch (err) {
        console.error(`Lỗi khi lấy chi tiết người dùng ${userId}:`, err);
        setError("Không thể tải thông tin người dùng. Vui lòng thử lại sau."); // Thiết lập thông báo lỗi
        setUser(null); // Đặt user về null nếu có lỗi
      } finally {
        setIsLoading(false); // Kết thúc tải dữ liệu
      }
    }

    fetchUserDetail(); // Gọi hàm fetchUserDetail ngay lập tức

  }, [userId]); // [userId] là dependency array. useEffect sẽ chạy lại mỗi khi userId thay đổi.

  // 6. Xử lý trạng thái tải và lỗi
  if (isLoading) {
    return (
      <Typography variant="body1" align="center" style={{ marginTop: 20 }}>
        Loading user's info
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

  // Nếu không có lỗi và không tải, nhưng user vẫn là null (nghĩa là không tìm thấy người dùng)
  if (!user) {
    return <Typography variant="body1">User not found.</Typography>;
  }

  // 7. Render giao diện người dùng dựa trên dữ liệu trong state 'user'.
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
        {/* Liên kết đến trang ảnh của người dùng */}
        <Link component={RouterLink} to={`/photos/${userId}`}>
          View photos of {user.first_name}
        </Link>
      </Typography>
    </Paper>
  );
}

export default UserDetail;
