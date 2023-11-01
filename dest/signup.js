function signup(e) {
  e.preventDefault();//ko load lai trang
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (username === "" || password === "" || email === "") {
    alert("Vui lòng không để trống!");
  } else {
    var isUsernameTaken = false;
    var isEmailTaken = false;

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var userJSON = localStorage.getItem(key);

      try {
        var user = JSON.parse(userJSON);
        if (user.username === username) {
          isUsernameTaken = true; // Username đã tồn tại
        }
        if (user.email === email) {
          isEmailTaken = true; // Email đã tồn tại
        }
      } catch (error) {
        // Nếu không thể phân tích chuỗi JSON, bỏ qua nó và tiếp tục với mục tiếp theo.
      }
    }

    if (isUsernameTaken && isEmailTaken) {
      alert("Tên đăng nhập và Email đã tồn tại!");
    } else if (isUsernameTaken) {
      alert("Tên đăng nhập đã tồn tại!");
    } else if (isEmailTaken) {
      alert("Email đã tồn tại!");
    } else {
      var user = {
        username: username,
        email: email,
        password: password,
      };
      var json = JSON.stringify(user);
      localStorage.setItem(username, json);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Sign Up success",
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => {
        window.location.href = "/login.html";
      }, 900);
    }
  }
}
