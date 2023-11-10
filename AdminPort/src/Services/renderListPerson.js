import callApiPerson from '../Controller/callApiPerson.js';
import Person from '../models/person.js';
// import { selectType } from '../../../dest/signup.js';
const $a = document.querySelector.bind(document);
let api = new callApiPerson();
// let person = new Person();
let persons = [];

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

function renderPerson(data) {
  let tablePerson = $a('#listAcount');
  let content = data.reduce((prev, account) => {
    const { id, username, password, fullname, email, type } = account;
    return (
      prev +
      `<tr>
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
        </tr>`
    );
  }, '');
  tablePerson.innerHTML = content;
}
function getValueInput() {
  const userName = $a('#namePerson').value;
  const passWord = $a('#passwordPerson').value;
  const fullName = $a('#fullnamePerson').value;
  const Email = $a('#emailPerson').value;
  const typePerson = $a('#typePerson').value;
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
    .then(function (data) {
      let valueInput = getValueInput();
      getListPerson(valueInput);
      NotiAlert('success', 'Them thanh cong', 2000);
      $a('#myModalPerson').click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
export function getInfoPerson() {
  let Info = getValueInput();
  let person = new Person(
    '',
    Info.username,
    Info.fullname,
    Info.email,
    Info.password,
    Info.type
  );
  addPerson(person);
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
  const fields = ['name', 'password', 'fullname', 'email', 'type'];
  fields.forEach((field) => {
    $a(`#${field}Person`).value = person[field];
  });
  let buttonEdit = $a('#btnEdit');
  buttonEdit.innerHTML = `<button id="updateBtnPerson" idPerson="${person.id}">Update edit</button>`;
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
          Info.password,
          Info.fullname,
          Info.email,
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