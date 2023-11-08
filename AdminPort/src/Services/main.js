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

function renderProduct(data) {
  let table = $a('.DanhSachSanPham');
  let content = '';
  for (let i = 0; i < data.length; i++) {
    let Product = data[i];
    const {id,name,price,screen,backCamera, frontCamera, img, desc,type} = Product
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
       
     <button keyProduct="${id}"
      class="edit-button"  style="border:none; background-color:transparent; padding-left:5px; font-size:22px; cursor: pointer;"><i class ="fa fa-pencil" ></i></button> 
     <button  keyProduct="${id}"  class="delete-button fa-solid fa-trash "
     style="border:none ; background-color:transparent; padding-left:5px; font-size:22px; cursor: pointer;">
     </button>
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
  addProduct(Product);
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

// function imgView() {
//   let src = $a('#picture').value;
//   $a('#picture-preview').src = src;
// }
// $a('#picture').oninput = imgView();

async function deleteProduct(id) {
  const result = await Swal.fire({
    title: 'Bạn có chắc chắn muốn xóa sản phẩm?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Đồng ý',
    cancelButtonText: 'Hủy',
  });
  if (result.isConfirmed) {
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

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-button')) {
    const productId = event.target.getAttribute('keyProduct');
    deleteProduct(productId);
  }
});

// $a('.edit-button').addEventListener('click', () => {
//   $a('#myModal').style.display = 'block';
//   resetForm();
// });

function NotiAlert(icon, title, timer) {
  Swal.fire({
    position: 'center',
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: timer,
  });
}

function resetForm() {
  const arrInput = $all('.form-group input');
  const newArrInput = Array.from(arrInput);
  newArrInput.map((input) => {
    input.value = '';
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
