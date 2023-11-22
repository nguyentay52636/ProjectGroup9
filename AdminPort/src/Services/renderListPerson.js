import callApiPerson from '../Controller/callApiPerson.js';
import { checkEmail, checkEmpty, checkNumber } from '../Error/validation.js';
import Person from '../models/person.js';
import { resetForm } from './main.js';
// import { checkEmail, checkNumber, checkEmpty } from '../Error/validation.js';
// import { selectType } from '../../../dest/signup.js';
const $a = document.querySelector.bind(document);
let api = new callApiPerson();
// let person = new Person();
let persons = [];
let isValid = [];
const getListPerson = () => {
  let promise = api.fectchData();
  promise
    .then((result) => {
      persons = result.data;
      renderPerson(persons);
    })
    .catch((error) => {
      console.log(error);
    });
};
getListPerson();
export const searchPerson = () => {
  const searchPerson = $a('#searchPerson').value.toLowerCase();
  const filterPerson = persons.filter(function (person) {
    return person.fullname.toLowerCase().includes(searchPerson);
  });
  renderPerson(filterPerson);
};
function renderPerson(data) {
  let tablePerson = $a('#listAcount');
  let content = data.reduce((prev, account) => {
    return prev + innerPerson(account);
  }, '');
  tablePerson.innerHTML = content;
}
function innerPerson(account) {
  const { id, username, password, fullname, email, type } = account;
  return `<tr>
  <td>${id}</td>
  <td>${username}</td>
  <td>${password}</td>
  <td>${fullname}</td>
  <td>${email}</td>
   <td>${type}</td>
   <td>
   <button id="editBtn" idPerson="${id}"  style="border:none; background-color:transparent; padding-left:5px; font-size:22px;" class="fa fa-pencil"></button> 
  <button id="deleteBtn" idPerson="${id}" style="border:none ; background-color:transparent; padding-left:5px font-size:22px;" class="fa-solid fa-trash">
  </button>
   
   </td>
</tr>`;
}
function getValueInput() {
  const userName = $a('#namePerson').value;
  const passWord = $a('#passwordPerson').value;
  const fullName = $a('#fullnamePerson').value;
  const Email = $a('#emailPerson').value;
  const typePerson = $a('#typePerson').value;
  isValid = [
    checkEmpty(userName, 'Vui lòng không để  trống!', '#tb-namePerson'),
    checkEmpty(passWord, 'Vui lòng không để  trống!', '#tb-password'),
    checkNumber(passWord, 'Vui lòng nhập giá là số', '#tb-password'),
    checkEmpty(fullName, 'Vui lòng không để  trống!', '#fullnamePerson'),
    checkEmpty(Email, 'Vui lòng không để  trống!', '#emailPerson'),
    checkEmail(Email, 'Email không đúng định dạng ', '#emailPerson'),
    checkEmpty(typePerson, 'Vui lòng không để  trống!', '#tb-typeacount'),
  ];
  let InfoValue = {
    username: userName,
    fullname: fullName,
    email: Email,
    password: passWord,
    type: typePerson,
  };
  return InfoValue;
}

//addperson
function addPerson(data) {
  let promise = api.addPerson(data);

  promise
    .then(function () {
      let valueInput = getValueInput();
      getListPerson(valueInput);
      NotiAlert('success', 'Them thanh cong', 2000);
      $a('#myModalPerson').click();
      resetForm();
    })
    .catch(function (error) {
      console.log(error);
    });
}
export function getInfoPerson() {
  let Info = getValueInput();
  if (Info === null) {
    return null;
  }
  const status = isValid.filter((status) => {
    return status === false;
  });
  if (status) {
    let person = new Person(
      Info.id,
      Info.username,
      Info.fullname,
      Info.email,
      Info.password,
      Info.type
    );
    addPerson(person);
  }
}

// delete
export function deletePerson(id) {
  Swal.fire({
    title: 'Bạn có chắc chắn muốn xóa người dùng?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Đồng ý',
    cancelButtonText: 'Hủy',
  }).then((result) => {
    if (result.isConfirmed) {
      let promise = api.deletePerson(id);
      promise
        .then(function () {
          getListPerson();
          NotiAlert('success', 'Xóa thành công', 2000);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
}

// Edit person
export function infoEditPerson(person) {
  // const fields = ['name', 'password', 'fullname', 'email', 'type'];

  // fields.forEach((field) => {
  //   console.log(field);
  //   $a(`#${field}Person`).value = person[field];
  // });
  $a('#namePerson').value = person.username;
  $a('#passwordPerson').value = person.password;
  $a('#fullnamePerson').value = person.fullname;
  $a('#emailPerson').value = person.email;
  $a('#typePerson').value = person.type;

  let buttonEdit = $a('#btnEditPerson');
  // console.log(buttonEdit);
  buttonEdit.innerHTML = `<button id="updateBtnPerson"  idPerson="${person.id}">Update edit</button>`;
  $a('#myModalPerson').style.display = 'block';
}

export function editPerson(id) {
  let promise = api.getInfoPerson(id);
  promise
    .then(function (result) {
      infoEditPerson(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function NotiAlert(icon, title, timer) {
  Swal.fire({
    position: 'center',
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: timer,
  });
}
// update
export function updatePerson(id) {
  // Hỏi người dùng xác nhận trước khi sửa
  Swal.fire({
    title: 'Xác nhận',
    text: 'Bạn có chắc chắn muốn sửa người dùng?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Đồng ý',
    cancelButtonText: 'Hủy',
  }).then((result) => {
    if (result.isConfirmed) {
      // Nếu người dùng đồng ý, thực hiện sửa người dùng
      let Info = getValueInput();
      if (Info) {
        var person = new Person(
          Info.id,
          Info.username,
          Info.fullname,
          Info.email,
          Info.password,
          Info.type
        );
      }

      let promise = api.editPerson(id, person);
      promise
        .then(function () {
          getListPerson();
          NotiAlert('success', 'Sửa thành công', 1000);
          $a('#iconClose').click();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
}
