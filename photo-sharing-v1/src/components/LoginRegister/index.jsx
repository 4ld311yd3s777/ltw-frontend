// import React, { useState, useEffect } from 'react';
// import {
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Box,
//   Grid,
//   ToggleButtonGroup,
//   ToggleButton
// } from '@mui/material';
// import { useNavigate, useSearchParams } from 'react-router-dom';

// const LoginRegister = () => {
//   const [searchParams] = useSearchParams();
//   const defaultMode = searchParams.get('mode') || 'login';
//   const [mode, setMode] = useState(defaultMode);

//   // Cập nhật lại khi URL thay đổi
//   useEffect(() => {
//     const newMode = searchParams.get('mode') || 'login';
//     setMode(newMode);
//   }, [searchParams]);

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [occupation, setOccupation] = useState('');
//   const [location, setLocation] = useState('');
//   const [description, setDescription] = useState('');

//   const navigate = useNavigate();


//   const handleLogin = (event) => {
//     event.preventDefault();

//     console.log('Đăng nhập với:', { username, password });

//     // === PHẦN GỌI BACKEND ĐĂNG NHẬP (TẠM COMMENT LẠI) ===
//     /*
//     fetch('/admin/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ login_name: username, password })
//     })
//       .then(res => {
//         if (!res.ok) throw new Error('Sai tên đăng nhập hoặc mật khẩu!');
//         return res.json();
//       })
//       .then(data => {
//         localStorage.setItem('user', JSON.stringify(data)); // Lưu thông tin người dùng
//         navigate('/users/' + data._id); // Chuyển sang trang người dùng
//       })
//       .catch(error => alert(error.message));
//     */

//     // TẠM THỜI GIẢ LẬP ĐĂNG NHẬP
//     setTimeout(() => {
//       const fakeUser = {
//         _id: '57231f1a30e4351f4e9f4bd7',
//         first_name: 'Ian',
//         last_name: 'Malcolm',
//       };
//       localStorage.setItem('user', JSON.stringify(fakeUser));
//       navigate('/users/' + fakeUser._id);
//     }, 500);
//   };

//   const handleRegister = (event) => {
//     event.preventDefault();

//     if (password !== confirmPassword) {
//       alert('Mật khẩu và xác nhận mật khẩu không khớp!');
//       return;
//     }

//     console.log('Đăng ký với:', {
//       username,
//       password,
//       firstName,
//       lastName,
//       occupation,
//       location,
//       description
//     });

//     // === PHẦN GỌI BACKEND ĐĂNG KÝ (TẠM COMMENT LẠI) ===
//     /*
//     fetch('/user', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         login_name: username,
//         password,
//         first_name: firstName,
//         last_name: lastName,
//         occupation,
//         location,
//         description
//       })
//     })
//       .then(res => {
//         if (!res.ok) throw new Error('Tên đăng nhập đã tồn tại hoặc thông tin không hợp lệ!');
//         return res.json();
//       })
//       .then(data => {
//         alert('Đăng ký thành công! Mời bạn đăng nhập.');
//         setMode('login');
//       })
//       .catch(error => alert(error.message));
//     */

//     // TẠM THỜI GIẢ LẬP ĐĂNG KÝ
//     setTimeout(() => {
//       alert('Đăng ký thành công! Mời bạn đăng nhập.');
//       setMode('login');
//     }, 500);
//   };

//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh' }}>
//       <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: '100%', borderRadius: 2 }}>
//         <ToggleButtonGroup
//           color="primary"
//           value={mode}
//           exclusive
//           onChange={(e, newMode) => {
//             if (newMode) setMode(newMode);
//           }}
//           fullWidth
//           sx={{ mb: 3 }}
//         >
//           <ToggleButton value="login">Đăng nhập</ToggleButton>
//           <ToggleButton value="register">Đăng ký</ToggleButton>
//         </ToggleButtonGroup>

//         {mode === 'login' ? (
//           <>
//             <Typography variant="h5" gutterBottom align="center">Đăng nhập</Typography>
//             <form onSubmit={handleLogin}>
//               <TextField
//                 label="Tên đăng nhập"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//               <TextField
//                 label="Mật khẩu"
//                 type="password"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//                 Đăng nhập
//               </Button>
//             </form>
//           </>
//         ) : (
//           <>
//             <Typography variant="h5" gutterBottom align="center">Đăng ký tài khoản mới</Typography>
//             <form onSubmit={handleRegister}>
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <TextField
//                     label="Tên"
//                     fullWidth
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     label="Họ"
//                     fullWidth
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Tên đăng nhập"
//                     fullWidth
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     label="Mật khẩu"
//                     type="password"
//                     fullWidth
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     label="Xác nhận mật khẩu"
//                     type="password"
//                     fullWidth
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     required
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Nghề nghiệp"
//                     fullWidth
//                     value={occupation}
//                     onChange={(e) => setOccupation(e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Địa điểm"
//                     fullWidth
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Mô tả"
//                     fullWidth
//                     multiline
//                     rows={3}
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                   />
//                 </Grid>
//               </Grid>
//               <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
//                 Đăng ký
//               </Button>
//             </form>
//           </>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default LoginRegister;
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginRegister = () => {
  const [searchParams] = useSearchParams();
  const defaultMode = searchParams.get('mode') || 'login';
  const [mode, setMode] = useState(defaultMode);

  useEffect(() => {
    const newMode = searchParams.get('mode') || 'login';
    setMode(newMode);
  }, [searchParams]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    // Giả lập đăng nhập thành công
    setTimeout(() => {
      const fakeUser = {
        _id: '57231f1a30e4351f4e9f4bd7',
        first_name: 'Ian',
        last_name: 'Malcolm',
      };
      localStorage.setItem('user', JSON.stringify(fakeUser));
      localStorage.setItem('userFirstName', fakeUser.first_name);
      localStorage.setItem('userToken', 'fake-token');
      window.dispatchEvent(new Event('userStateChanged'));
      navigate('/users/' + fakeUser._id);
    }, 500);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Mật khẩu và xác nhận mật khẩu không khớp!');
      return;
    }

    // Giả lập đăng ký thành công
    setTimeout(() => {
      alert('Đăng ký thành công! Mời bạn đăng nhập.');
      setMode('login');
    }, 500);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: '100%', borderRadius: 2 }}>
        <ToggleButtonGroup
          color="primary"
          value={mode}
          exclusive
          onChange={(e, newMode) => newMode && setMode(newMode)}
          fullWidth
          sx={{ mb: 3 }}
        >
          <ToggleButton value="login">Login</ToggleButton>
          <ToggleButton value="register">Register</ToggleButton>
        </ToggleButtonGroup>

        {mode === 'login' ? (
          <>
            <Typography variant="h5" gutterBottom align="center">Login</Typography>
            <form onSubmit={handleLogin}>
              <TextField
                label="Tên đăng nhập"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <TextField
                label="Mật khẩu"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Login
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom align="center">Đăng ký tài khoản mới</Typography>
            <form onSubmit={handleRegister}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Tên"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Họ"
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Tên đăng nhập"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Mật khẩu"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Xác nhận mật khẩu"
                    type="password"
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Nghề nghiệp"
                    fullWidth
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Địa điểm"
                    fullWidth
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Mô tả"
                    fullWidth
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
                Register me
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default LoginRegister;
