import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Cấu hình Axios để luôn gửi cookies trong mọi yêu cầu
    axios.defaults.withCredentials = true;
    const API_BASE_URL = 'http://localhost:3001/api'; // Đảm bảo URL này khớp với backend của bạn

    // --- QUAN TRỌNG: Đây là thay đổi chính ---
    // Kiểm tra trạng thái đăng nhập khi component được mount (tải lên)
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                // Chúng ta sẽ gọi một API backend chuyên dụng để kiểm tra session.
                // API này sẽ trả về thông tin người dùng đã đăng nhập nếu session tồn tại,
                // hoặc lỗi 401 nếu không.
                const response = await axios.get(`${API_BASE_URL}/admin/checkSession`); // Giả định bạn sẽ tạo endpoint backend này
                if (response.status === 200 && response.data.user) {
                    setUser(response.data.user);
                    setIsLoggedIn(true);
                } else {
                    // Nếu backend phản hồi 200 nhưng không có user, hoặc bất kỳ phản hồi không mong muốn nào khác
                    setUser(null);
                    setIsLoggedIn(false);
                }
            } catch (error) {
                // Lỗi 401 hoặc lỗi mạng nghĩa là không có session hoạt động hoặc có vấn đề
                console.log('Người dùng chưa đăng nhập hoặc phiên đã hết hạn (đã kiểm tra qua /admin/checkSession).', error.response?.data?.error || error.message);
                setUser(null);
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false); // Việc kiểm tra xác thực đã hoàn tất
            }
        };

        checkLoginStatus();
    }, []); // Mảng phụ thuộc rỗng đảm bảo hàm này chỉ chạy một lần khi component mount

    const login = async (login_name, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/admin/login`, { login_name, password });
            const loggedInUser = response.data; // Dữ liệu này phải chứa _id, first_name, login_name, v.v.
            setUser(loggedInUser);
            setIsLoggedIn(true);
            // Chúng ta loại bỏ việc sử dụng localStorage ở đây, vì session trên backend là đáng tin cậy.
            // Nếu người dùng tải lại trang, API checkSession sẽ xác thực lại.
            return { success: true, user: loggedInUser };
        } catch (error) {
            console.error('Đăng nhập thất bại:', error.response ? error.response.data.error : error.message);
            return { success: false, error: error.response ? error.response.data.error : 'Lỗi đăng nhập không xác định.' };
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${API_BASE_URL}/admin/logout`);
            setUser(null);
            setIsLoggedIn(false);
            // Không cần xóa localStorage nếu chúng ta không sử dụng nó cho trạng thái đăng nhập liên tục.
            return { success: true };
        } catch (error) {
            console.error('Đăng xuất thất bại:', error.response ? error.response.data.error : error.message);
            return { success: false, error: error.response ? error.response.data.error : 'Lỗi đăng xuất không xác định.' };
        }
    };

    // Hàm đăng ký mới (như đã thảo luận trong các bước trước)
    const register = async (userData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/user`, userData);
            return { success: true, message: response.data.message, user: response.data };
        } catch (error) {
            console.error('Đăng ký thất bại:', error.response ? error.response.data.error : error.message);
            return { success: false, error: error.response ? error.response.data.error : 'Lỗi đăng ký không xác định.' };
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, isLoading, login, logout, register, API_BASE_URL }}>
            {children}
        </AuthContext.Provider>
    );
};