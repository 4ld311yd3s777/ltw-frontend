

import React, { useState, useEffect } from "react"; // 1. Import useState và useEffect
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
// import models from "../../modelData/models"; // 2. Xóa hoặc comment dòng này
import fetchModel from "../../lib/fetchModelData"; // 3. Import hàm fetchModel của bạn

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  // 4. Khởi tạo state để lưu trữ danh sách người dùng.
  // Ban đầu, nó sẽ là một mảng rỗng.
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // (Tùy chọn) Thêm state để xử lý lỗi
  const [isLoading, setIsLoading] = useState(true); // (Tùy chọn) Thêm state để theo dõi trạng thái tải

  // 5. Sử dụng useEffect để gọi API khi component được mount (tải lần đầu).
  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true); // Bắt đầu tải dữ liệu
        // Gọi hàm fetchModel của bạn để lấy dữ liệu từ endpoint /user/list
        const userListData = await fetchModel("/user/list");
        setUsers(userListData); // Cập nhật state 'users' với dữ liệu nhận được
        setError(null); // Xóa lỗi nếu có
      } catch (err) {
        console.error("Lỗi khi lấy danh sách người dùng:", err);
        setError("Không thể tải danh sách người dùng. Vui lòng thử lại sau."); // Thiết lập thông báo lỗi
      } finally {
        setIsLoading(false); // Kết thúc tải dữ liệu
      }
    }

    fetchUsers(); // Gọi hàm fetchUsers ngay lập tức

  }, []); // Mảng rỗng [] làm đối số thứ hai cho useEffect có nghĩa là
          // hàm này chỉ chạy MỘT LẦN sau khi component được render lần đầu (giống componentDidMount).

  // 6. Xử lý trạng thái tải và lỗi (tùy chọn)
  if (isLoading) {
    return (
      <Typography variant="body1" align="center" style={{ marginTop: 20 }}>
        Loading userlist
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

  // 7. Render giao diện người dùng dựa trên dữ liệu trong state 'users'.
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        UserList
      </Typography>
      {users.length > 0 ? ( // Chỉ hiển thị danh sách nếu có người dùng
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
      ) : (
        <Typography variant="body1" align="center" style={{ marginTop: 20 }}>
          No user found
        </Typography>
      )}
    </div>
  );
}

export default UserList;