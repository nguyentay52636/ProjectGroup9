import Product from '../models/product.js';
import CallApi from '../Controller/callApi.js';
import {
  getInfoPerson,
  deletePerson,
  editPerson,
  updatePerson,
} from './renderListPerson.js';
import { searchPerson } from './renderListPerson.js';
import { checkEmpty, checkNumber } from '../Error/validation.js';

const $a = document.querySelector.bind(document);
const $all = document.querySelectorAll.bind(document);
let api = new CallApi();
let products = [];
let isValid = [];
let numberItems = 13;
let currentPage = 1;
//phan trang
const renderCurrentPage = (products, pageNumber) => {
  try {
    const startIndex = (pageNumber - 1) * numberItems;
    const endIndex = startIndex + numberItems;
    const currentItems = products.slice(startIndex, endIndex);
    console.log(currentItems);
    renderProduct(currentItems);
    $a('#currentPage').textContent = `Trang ${pageNumber}`;
  } catch (error) {
    console.error('Error in renderCurrentPage:', error);
  }
};

$a('#prevPage').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderCurrentPage(products, currentPage);
  }
});

$a('#nextPage').addEventListener('click', () => {
  const totalPages = Math.ceil(products.length / numberItems);
  if (currentPage < totalPages) {
    console.log();
    currentPage++;
    renderCurrentPage(products, currentPage);
  }
});

const getListProduct = async () => {
  try {
    const result = await api.fectchData();
    products = result.data;
    renderCurrentPage(products, currentPage);
  } catch (error) {
    console.log(error);
  }
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

  renderCurrentPage(filteredProducts, currentPage);
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
       
     <button  keyProduct="${id}" class="edit-button fa fa-pencil" style="border:none; background-color:transparent; padding-left:5px; font-size:22px; cursor: pointer;"></button>
<button keyProduct="${id}" class="delete-button fa-solid fa-trash" style="border:none; background-color:transparent; padding-left:5px; font-size:22px; cursor: pointer;"></button>

   </td>
             </tr>`;
  }
  table.innerHTML = content;
}

function getInfo() {
  const name = $a('#name').value;
  const price = $a('#price').value;
  const screen = $a('#screen').value;
  const backCamera = $a('#backcamera').value;
  const frontCamera = $a('#frontcamera').value;
  const img = $a('#picture').value;
  const desc = $a('#desc').value;
  const type = $a('#type').value;
  isValid = [
    checkEmpty(name, 'Vui lòng nhập tên sản phẩm', '#tbName'),
    checkEmpty(price, 'Vui lòng nhập giá sản phẩm', '#tbPrice'),
    checkNumber(price, 'Vui lòng nhập giá là số', '#tbPrice'),
    checkEmpty(screen, 'Vui lòng nhập thông số màn hình', '#tbScreen'),
    checkEmpty(
      backCamera,
      'Vui lòng nhập thông số camera sau',
      '#tbBackCamera'
    ),
    checkEmpty(
      frontCamera,
      'Vui lòng nhập thông số camera trước',
      '#tbFrontCamera'
    ),
    checkEmpty(img, 'Vui lòng nhập đường dẫn ảnh sản phẩm', '#tbPicture'),
    checkEmpty(desc, 'Vui lòng nhập mô tả sản phẩm', '#tbDesc'),
    checkEmpty(type, 'Vui lòng chọn loại sản phẩm', '#tbType'),
  ];

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
//them thi lay gia tri o input => tao doi tuong = >
const getInfoProduct = () => {
  let Info = getInfo();
  if (Info === null) {
    return null;
  }
  const status = isValid.filter((status) => {
    return status === false;
  });
  if (status.length === 0) {
    let product = new Product(
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
    addProduct(product);
  }
};

async function addProduct(data) {
  try {
    const result = await api.addProduct(data);
    products = result.data;
    getListProduct(products);
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
  // console.log(buttonEdit);
  buttonEdit.innerHTML = `<button id="updateBtn" idProduct="${product.id}">Update edit</button>`;
  $a('#myModal').style.display = 'block';
}
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
$a('#myModal').addEventListener('click', (e) => {
  const id = e.target.id;
  console.log(123);
  switch (id) {
    case 'updateBtn':
      const idProduct = e.target.getAttribute('idProduct');
      updateProduct(idProduct);
      break;
  }
});
$a('#myModalPerson').addEventListener('click', (e) => {
  const id = e.target.id;
  switch (id) {
    case 'updateBtnPerson':
      console.log(123);
      const idPerson = e.target.getAttribute('idperson');
      updatePerson(idPerson);
      $a('#iconClose').click();
      resetForm();

      break;
  }
});
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
$a('#searchPerson').addEventListener('input', searchPerson);

//add image
function previewImage(input) {
  var file = input.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('picture-preview').src = e.target.result;
    };
    reader.readAsDataURL(file);
    //    onchange="previewImage(this)"
  }
}
