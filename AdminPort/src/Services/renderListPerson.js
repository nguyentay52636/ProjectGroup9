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
    const { id, username, password, fullname, email } = account;
    return (
      prev +
      `<tr>
          <td>${id}</td>
          <td>${username}</td>
          <td>${password}</td>
          <td>${fullname}</td>
          <td>${email}</td>
           <td>Admin</td>
           <td>
           <button onclick="editPerson(${id})  style="border:none; background-color:transparent; padding-left:5px;" class="fa fa-pencil"></button> 
          <button onclick="deleteProduct(${id})" style="border:none ; background-color:transparent; padding-left:5px" class="fa-solid fa-trash">
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
  const fullName = $a('#fullname').value;
  const Email = $a('#emailPerson').value;
  const typePerson = $a('#typeacount').value;
  let InfoValue = {
    username: userName,
    password: passWord,
    fullname: fullName,
    email: Email,
    type: typePerson,
  };
  return InfoValue;
}

function getInfoPerson() {
  let Info = getValueInput();
  let person = new Person(
    '',
    Info.username,
    Info.password,
    Info.fullname,
    Info.email,
    Info.type
  );
  addPerson(person);
}
//addperson
function addPerson(data) {
  let promise = api.addPerson(data);

  promise
    .then(function (data) {
      console.log(data);
      let valueInput = getValueInput();
      getListPerson(valueInput);
      NotiAlert('success', 'Them thanh cong', 2000);
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
// delete
function deleteProduct(id) {
  let promise = api.deletePerson(id);
  promise
    .then(function () {
      getListPerson();
      NotiAlert('error', 'Xoa thanh cong', 2000);
    })
    .catch(function (error) {
      console.log(error);
    });
}
// update
// function updateProduct(id) {
//   let Info = getInfo();
//   if (Info) {
//     var product = new Product(
//       Info.id,
//       Info.name,
//       Info.screen,
//       Info.backCamera,
//       Info.frontCamera,
//       Info.img,
//       Info.desc,
//       Info.type
//     );
//   }

//   let promise = api.editProduct(id, product);
//   promise
//     .then(function () {
//       getListProduct();
//       NotiAlert('success', 'ThanhCong', 1000);
//       $a('#iconClose').click();
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }
