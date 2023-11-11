import Product from '../models/product.js';
import CallApi from '../Controller/callApi.js';
import {
  getInfoPerson,
  deletePerson,
  editPerson,
  updatePerson,
} from './renderListPerson.js';
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

function SearchProduct() {
  const searchValue = $a('#searchProduct').value.toLowerCase();

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchValue) ||
      product.desc.toLowerCase().includes(searchValue) ||
      product.type.toLowerCase().includes(searchValue)
    );
  });

  renderProduct(filteredProducts);
}
$a('#searchProduct').addEventListener('input', SearchProduct);
$a('#btnAddPerson').addEventListener('click', getInfoPerson);

function renderProduct(data) {
  let table = $a('.DanhSachSanPham');
  let content = '';
  for (let i = 0; i < data.length; i++) {
    let Product = data[i];
    const {
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type,
    } = Product;
    content += `<tr >
    <td>${id}</td>
    <td>${name}</td>
    <td>${price}</td>
    <td>${screen}</td>
    <td>${backCamera}</td>
    <td>${frontCamera}</td>
    <td>
    <img src="${img}" alt="" width="50px" height="50px">
    </td>
    <td>${desc}</td>
     <td>${type}</td>
     <td> 
       
     <button keyProduct="${id}" class="edit-button fa fa-pencil" style="border:none; background-color:transparent; padding-left:5px; font-size:22px; cursor: pointer;"></button>
<button keyProduct="${id}" class="delete-button fa-solid fa-trash" style="border:none; background-color:transparent; padding-left:5px; font-size:22px; cursor: pointer;"></button>

   </td>
             </tr>`;
  }
  table.innerHTML = content;
}

function getInfo() {
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const screen = document.getElementById('screen').value;
  const backCamera = document.getElementById('backcamera').value;
  const frontCamera = document.getElementById('frontcamera').value;
  const img = document.getElementById('picture').value;
  const desc = document.getElementById('desc').value;
  const type = document.getElementById('type').value;
  const InfoValue = {
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
const getInfoProduct = () => {
  let Info = getInfo();
  let product = new Product(
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
  addProduct(product);
};
async function addProduct(data) {
  try {
    const result = await api.addProduct(data);
    getListProduct();
    NotiAlert('success', 'Them thanh cong', 2000);
    $a('#iconClose').click();
    resetForm();
  } catch (error) {
    console.log(error);
  }
}
$a('#btnAdd').addEventListener('click', getInfoProduct);

function imgView() {
  let src = $a('#picture').value;
  $a('#picture-preview').src = src;
}
$a('#picture').oninput = imgView;
async function deleteProduct(id) {
  // Hỏi người dùng xác nhận trước khi xóa
  const result = await Swal.fire({
    title: 'Bạn có chắc chắn muốn xóa sản phẩm?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Đồng ý',
    cancelButtonText: 'Hủy',
  });

  if (result.isConfirmed) {
    // Nếu người dùng đồng ý, thực hiện xóa sản phẩm
    deleteProductAsync(id);
  }
}

async function deleteProductAsync(id) {
  try {
    let result = await api.deleteProduct(id);
    getListProduct();
    NotiAlert('success', 'Xóa thành công', 2000);
  } catch (error) {
    NotiAlert('Failed to delete product. Please try again.', 'error');
  }
}

// function infoEdit(product) {
//   const { name, price, screen, backCamera, frontCamera, img, desc, type } =
//     product;
//   const productInputs = [
//     { id: 'name', value: name },
//     { id: 'price', value: price },
//     { id: 'screen', value: screen },
//     { id: 'backcamera', value: backCamera },
//     { id: 'frontcamera', value: frontCamera },
//     { id: 'picture', value: img },
//     { id: 'desc', value: desc },
//     { id: 'type', value: type },
//   ];

//   productInputs.map((input) => {
//     document.getElementById(input.id).value = input.value;
//   });
//   const buttonEdit = $a('#btnAdd');
//   buttonEdit.innerHTML = `<button class="btn btn-danger" onclick="editProduct(${product.id})" >Update edit</button>`;
// }
function infoEdit(product) {
  document.getElementById('name').value = product.name;
  document.getElementById('price').value = product.price;
  document.getElementById('screen').value = product.screen;
  document.getElementById('backcamera').value = product.backCamera;
  document.getElementById('frontcamera').value = product.frontCamera;
  document.getElementById('picture').value = product.img;
  document.getElementById('desc').value = product.desc;
  document.getElementById('type').value = product.type;
  imgView();
  let buttonEdit = document.querySelector('#btnEdit');
  console.log(buttonEdit);
  buttonEdit.innerHTML = `<button id="updateBtn" idProduct="${product.id}">Update edit</button>`;
  $a('#myModal').style.display = 'block';
}
$a('#myModal').addEventListener('click', (e) => {
  const id = e.target.id;
  switch (id) {
    case 'updateBtn':
      const idProduct = e.target.getAttribute('idProduct');
      updateProduct(idProduct);
      break;
    case 'updateBtnPerson':
      const idPerson = e.target.getAttribute('idPeson');
      updatePerson(idPerson);
      break;
  }
});
function editProduct(id) {
  let promise = api.getInfoProduct(id);
  promise
    .then(function (result) {
      infoEdit(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
$a('#iconClose').onclick = () => {
  resetForm();
};
// $a('#myModal').onclick = () => {
//   resetForm();
// };
//update product
function updateProduct(id) {
  // Hỏi người dùng xác nhận trước khi sửa
  Swal.fire({
    title: 'Xác nhận',
    text: 'Bạn có chắc chắn muốn sửa sản phẩm?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Đồng ý',
    cancelButtonText: 'Hủy',
  }).then((result) => {
    if (result.isConfirmed) {
      // Nếu người dùng đồng ý, thực hiện sửa sản phẩm
      let Info = getInfo();
      if (Info) {
        var product = new Product(
          Info.id,
          Info.name,
          Info.price,
          Info.screen,
          Info.backCamera,
          Info.frontCamera,
          Info.img,
          Info.desc,
          Info.type
        );
      }

      let promise = api.editProduct(id, product);
      promise
        .then(function () {
          getListProduct();
          NotiAlert('success', 'Sửa thành công', 1000);
          $a('#iconClose').click();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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

export function resetForm() {
  const arrInput = $all('.form-group input');
  const newArrInput = Array.from(arrInput);
  newArrInput.map((input) => {
    input.value = '';
  });
}

//Person

//
// const getInfo = () => {
//   const getValueInput = $a('.form-group input');
//   const newInputProduct = Array.from(getValueInput);

//   const Info = newInputProduct.map((input) => {
//     return input.value;
//   });
//   const InfoValue = {
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

$a('#listAcount').addEventListener('click', (e) => {
  const id = e.target.id;
  const idPerson = e.target.getAttribute('idPerson');
  switch (id) {
    case 'editBtn':
      editPerson(idPerson);
      break;
    case 'deleteBtn':
      deletePerson(idPerson);
      break;
  }
});
document.addEventListener('click', function (event) {
  let isDeleteButton = event.target.classList.contains('delete-button');
  let isEditButton = event.target.classList.contains('edit-button');
  const productId = event.target.getAttribute('keyProduct');
  if (isDeleteButton) {
    deleteProduct(productId);
  } else if (isEditButton) {
    editProduct(productId);
  }
});
