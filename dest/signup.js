const $a = document.querySelector.bind(document);

// // validate Kiet
// function showError(input, message) {
//   let parent = input.parentElement;
//   let small = parent.querySelector('small');
//   parent.classList.add('error');
//   small.innerText = message;
// }

// function showSuccess(input) {
//   let parent = input.parentElement;
//   let small = parent.querySelector('small');
//   parent.classList.remove('error');
//   small.innerText = '';
// }

// function checkEmptyError(...listInput) {
//   let isEmptyError = false;
//   listInput.forEach((input) => {
//     input.value = input.value.trim();
//     if (input.value === '') {
//       isEmptyError = true;
//       showError(input, 'Không được để trống!');
//     } else {
//       showSuccess(input);
//     }
//   });

//   return isEmptyError;
// }
// // Password
// // Check length within the range [min, max]
// function checkLengthError(input, min, max) {
//   if (input.value.trim() === '') {
//     showError(input, 'Không được để trống');
//     return true;
//   }

//   input.value = input.value.trim();
//   if (
//     input.value === '' ||
//     input.value.length < min ||
//     input.value.length > max
//   ) {
//     showError(input, `Phải có từ ${min} - ${max} ký tự`);
//     return true;
//   }

//   showSuccess(input);
//   return false;
// }

// // Confirm Password
// function checkMatchPasswordError(passwordInput, cfPasswordInput) {
//   if (passwordInput.value !== cfPasswordInput.value) {
//     showError(cfPasswordInput, 'Mật khẩu không trùng khớp');
//     return true;
//   }
//   return false;
// }

// // Fullname
// function checkFullnameError(input) {
//   if (input.value.trim() === '') {
//     showError(input, 'Không được để trống');
//     return true;
//   }

//   const words = input.value.split(' ');
//   for (const word of words) {
//     if (!/^[A-Z]/.test(word)) {
//       showError(input, 'In hoa chữ cái đầu mỗi từ');
//       return true;
//     }
//   }

//   showSuccess(input);
//   return false;
// }
function signUp() {
  const userName = $a('#username').value;
  const fullName = $a('#fullname').value;
  const passWord = $a('#password').value;
  const email = $a('#email').value;
  const passWordAgain = $('#Cfpassword').value;
  let promise = axios({
    url: 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/users',
    method: 'POST',
    data: {
      username: userName,
      fullname: fullName,
      email: email,
      password: passWord,
    },
  });
  let json = JSON.stringify(data);
  localStorage.setItem(userName, json);
  localStorage.setItem('loggedInUser', fullName);
  promise.then((result) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Đăng ký thành công',
      showConfirmButton: false,
      timer: 1000,
    });
    setTimeout(() => {
      //
      window.location.href = '/login.html';
    }, 1000);
  });
}

$a('.signUp__btn').addEventListener('click', signUp);

// export function selectType() {
//   let selectedValue = $a('#TypeSelect').value;
//   if (selectedValue === 'admin') {
//     renderPerson(persons, 'admin');
//   } else if (selectedValue === 'user') {
//     renderPerson(persons, 'user');
//   }
// }
// $a('#TypeSelect').addEventListener('change', selectType);
