function login(e) {
  e.preventDefault();
  var usernameInput = document.getElementById('username');
  var passwordInput = document.getElementById('password');
  var username = usernameInput.value;
  var password = passwordInput.value;
  var user = localStorage.getItem(username);

  if (username === '' || password === '') {
    alert('Vui lòng không để trống');
  } else if (user == null) {
    alert('Tài khoản không tồn tại');
    usernameInput.value = ''; // Reset giá trị trường username
    passwordInput.value = '';
  } else {
    var data = JSON.parse(user);
    if (username === data.username && password === data.password) {
      alert('Đăng nhập thành công');

      // Lưu tên người dùng vào localStorage
      localStorage.setItem('loggedInUser', username);

      window.location.href = '/index.html';

      usernameInput.value = ''; // Reset giá trị trường username
      passwordInput.value = ''; // Reset giá trị trường password
    } else {
      alert('Mật khẩu đăng nhập không đúng!');
    }
  }
}
