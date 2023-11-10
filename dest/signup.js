// function signup(e) {
//   e.preventDefault();//ko load lai trang
//   var username = document.getElementById("username").value;
//   var email = document.getElementById("email").value;
//   var password = document.getElementById("password").value;

//   if (username === "" || password === "" || email === "") {
//     alert("Vui lòng không để trống!");
//   } else {
//     var isUsernameTaken = false;
//     var isEmailTaken = false;

//     for (var i = 0; i < localStorage.length; i++) {
//       var key = localStorage.key(i);
//       var userJSON = localStorage.getItem(key);

//       try {
//         var user = JSON.parse(userJSON);
//         if (user.username === username) {
//           isUsernameTaken = true; // Username đã tồn tại
//         }
//         if (user.email === email) {
//           isEmailTaken = true; // Email đã tồn tại
//         }
//       } catch (error) {
//         // Nếu không thể phân tích chuỗi JSON, bỏ qua nó và tiếp tục với mục tiếp theo.
//       }
//     }

//     if (isUsernameTaken && isEmailTaken) {
//       alert("Tên đăng nhập và Email đã tồn tại!");
//     } else if (isUsernameTaken) {
//       alert("Tên đăng nhập đã tồn tại!");
//     } else if (isEmailTaken) {
//       alert("Email đã tồn tại!");
//     } else {
//       var user = {
//         username: username,
//         email: email,
//         password: password,
//       };
//       var json = JSON.stringify(user);
//       localStorage.setItem(username, json);
//       Swal.fire({
//         position: "center",
//         icon: "success",
//         title: "Sign Up success",
//         showConfirmButton: false,
//         timer: 1000,
//       });
//       setTimeout(() => {
//         window.location.href = "/login.html";
//       }, 900);
//     }
//   }
// }
//Tay viet
const $a = document.querySelector.bind(document);

function signUp() {
  const userName = $a('#username').value;
  const fullName = $a('#fullname').value;
  const passWord = $a('#password').value;
  const email = $a('#email').value;
  const passWordAgain = $('#Cfpassword').value;

  // let user = localStorage.getItem(userName);
  let promise = axios({
    url: 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/users',
    method: 'POST',
    data: {
      fullname: fullName,
      username: userName,
      password: passWord,
      email: email,
    },
  });
  localStorage.setItem('loggedInUser', fullName);
  promise.then((result) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Success',
      showConfirmButton: false,
      timer: 500,
    });
    setTimeout(() => {
      //
      window.location.href = '/login.html';
    }, 1000);
  });
}
$a('.signUp__btn').addEventListener('click', signUp);

export function selectType() {
  let selectedValue = $a('#TypeSelect').value;
  if (selectedValue === 'admin') {
    renderPerson(persons, 'admin');
  } else if (selectedValue === 'user') {
    renderPerson(persons, 'user');
  }
}
$a('#TypeSelect').addEventListener('change', selectType);
