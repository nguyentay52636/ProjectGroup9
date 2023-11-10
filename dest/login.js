// function login(e) {
//   e.preventDefault();
//   var usernameInput = document.getElementById('username');
//   var passwordInput = document.getElementById('password');
//   var username = usernameInput.value;
//   var password = passwordInput.value;
//   var user = localStorage.getItem(username);

//   if (username === '' || password === '') {
//     alert('Vui lòng không để trống');
//   } else if (user == null) {
//     alert('Tài khoản không tồn tại');
//     usernameInput.value = ''; // Reset giá trị trường username
//     passwordInput.value = '';
//   } else {
//     var data = JSON.parse(user);
//     if (username === data.username && password === data.password) {
//       alert('Đăng nhập thành công');

//       // Lưu tên người dùng vào localStorage
//       localStorage.setItem('loggedInUser', username);

//       window.location.href = '/index.html';

//       usernameInput.value = ''; // Reset giá trị trường username
//       passwordInput.value = ''; // Reset giá trị trường password
//     } else {
//       alert('Mật khẩu đăng nhập không đúng!');
//     }
//   }
// }
const $a = document.querySelector.bind(document);
// function checkEmpty() {}

function infoLogin() {
  const userName = $a('#username').value;
  const passWord = $a('#password').value;

  let promise = axios({
    url: 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/users',
    method: 'GET',
  });

  promise.then((data) => {
    for (let i = 0; i < data.data.length; i++) {
      if (userName === data.data[i].username) {
        if (passWord === data.data[i].password) {
          // Lưu thông tin đăng nhập vào localStorage
          let status = {
            statusLogin: true,
            userType: data.data[i].type,
          };
          localStorage.setItem('Login', JSON.stringify(status));

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 1000,
          });

          // Kiểm tra loại tài khoản và chuyển hướng
          checkUserTypeAndRedirect(data.data[i].type);
        }
      }
    }
  });
}

function checkUserTypeAndRedirect(userType) {
  if (userType === 'admin') {
    // Chuyển hướng tới trang admin
    window.location.href = '../AdminPort/index.html';
  } else if (userType === 'user') {
    // Chuyển hướng tới trang user
    window.location.href = '../index.html';
  } else {
    console.log('User type not recognized or not logged in.');
  }
}

$a('.btnLogin').addEventListener('click', infoLogin);
