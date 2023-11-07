import product from '../models/product.js';
import CallApi from '../Controller/callApi.js';

const $a = document.querySelector.bind(document);
const $all = document.querySelectorAll.bind(document);
let api = new CallApi();
let products = [];
const getListProduct = () => {
  let prosime = api.fectchData();
  prosime
    .then(function (result) {
      products = result.data;
      renderProduct(products);
    })
    .catch(function (error) {
      console.log(error);
    });
};
getListProduct();

function renderProduct(data) {
  let table = $a('.DanhSachSanPham');
  let content = '';
  for (let i = 0; i < data.length; i++) {
    let Product = data[i];
    content += `<tr >
    <td>${i + 1}</td>
    <td>${Product.name}</td>
    <td>${Product.price}</td>
    <td>${Product.screen}</td>
    <td>${Product.backCamera}</td>
    <td>${Product.frontCamera}</td>
    <td>
    <img src="${Product.img}" alt="" width="50px" height="50px">
    </td>
    <td>${Product.desc}</td>
     <td>${Product.type}</td>
     <td> 
       
     <button onclick="editProduct(${
       Product.id
     })" data-toggle="modal" data-target="#exampleModalCenter" style="border:none; background-color:transparent; padding-left:5px; font-size:22px; cursor: pointer;"><i class ="fa fa-pencil" ></i></button> 
     <button onclick="deleteProduct(${
       Product.id
     })" style="border:none ; background-color:transparent; padding-left:5px; font-size:22px; cursor: pointer;"><i class="fa-solid fa-trash"></i></i>
     </button>
   </td>
             </tr>`;
  }
  table.innerHTML = content;
}

function getInfo() {
  var name = document.getElementById('name').value;
  var price = document.getElementById('price').value;
  var screen = document.getElementById('screen').value;
  var backCamera = document.getElementById('backcamera').value;
  var frontCamera = document.getElementById('frontcamera').value;
  var img = document.getElementById('picture').value;
  var desc = document.getElementById('desc').value;
  var type = document.getElementById('type').value;
  var InfoValue = {
    name: name,
    price: price,
    screen: screen,
    backCamera: backCamera,
    frontCamera: frontCamera,
    img: img,
    desc: desc,
    type: type,
  };
  return InfoValue;
}
const getInfoProduct = async () => {
  let Info = getInfo();
  let Product = new product(
    '',
    Info.name,
    Info.price,
    Info.screen,
    Info.backCamera,
    Info.frontCamera,
    Info.img,
    Info.desc,
    Info.type
  );
  await addProduct(Product);
};
async function addProduct(data) {
  try {
    const result = await api.addProduct(data);
    getListProduct();
    resetForm();
    NotiAlert('success', 'Them thanh cong', 2000);
  } catch (error) {
    console.log(error);
  }
}
$a('#btnAdd').addEventListener('click', getInfoProduct);

const imgView = () => {
  let src = $a('#picture').value;
  $a('#picture-preview').src = src;
};
$a('#picture').oninput = imgView();

function NotiAlert(icon, title, timer) {
  Swal.fire({
    position: 'center',
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: timer,
  });
}

//
// const getInfo = () => {
//   const getValueInput = $a('.form-group input');
//   const newInputProduct = Array.from(getValueInput);

//   const Info = newInputProduct.map((input) => {
//     return input.value;
//   });
//   var InfoValue = {
//     name: Info[0],
//     price: Info[1],
//     screen: Info[2],
//     backCamera: Info[3],
//     frontCamera: Info[4],
//     img: Info[5],
//     desc: Info[6],
//     type: Info[7],
//   };
//   return InfoValue; // Trả về đối tượng chứa thông tin từ các ô nhập
// };

// const getInfoProduct = async () => {
//   let Info = getInfo();
//   console.log(Info);
//   let Product = new product(
//     '',
//     Info.name,
//     Info.price,
//     Info.screen,
//     Info.backCamera,
//     Info.frontCamera,
//     Info.img,
//     Info.desc,
//     Info.type
//   );
//   await addProduct(Product);
// };
function resetForm() {
  const arrInput = $a('.form-group input');
  const newArrInput = Array.from(arrInput);
  newArrInput.map((input) => {
    input.value = '';
  });
}
