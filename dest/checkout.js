let listCart = [];

let idUserLogged = localStorage.getItem('loggedIDUser');
// get data cart form cookie

function checkCart() {
  var cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('listCart='));
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split('=')[1]);
  }
}
checkCart();

addCartToHTML();
function addCartToHTML() {
  //clear data form html
  let listCartHTML = document.querySelector('.returnCart .list');
  listCartHTML.innerHTML = '';
  let totalQuantityHTML = document.querySelector('.totalQuantity');
  let totalPriceHTML = document.querySelector('.totalPrice');

  let totalQuantity = 0;
  let totalPrice = 0;

  if (listCart) {
    listCart.forEach((product) => {
      if (product) {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.setAttribute('data-id', product.id);
        newProduct.innerHTML = handleRender(product);
        listCartHTML.appendChild(newProduct); // Sử dụng .appendChild(newProduct) thay vì .appenChild(newP)

        totalQuantity += product.quantity;
        totalPrice += product.price * product.quantity;
      }
    });
  }
  totalQuantityHTML.innerText = totalQuantity;
  totalPriceHTML.innerText = totalPrice + '$';
}
function handleRender(product) {
  return `
<img src="${product.img}" alt="" />
<div class="info">
  <div class="name">${product.name}</div>
  <div class="price">${product.price}$</div>
</div>
<p class="quantity">${product.quantity}</p>
<p class="returnPrice">${product.price * product.quantity}$</p>
<div class="btnDelete" onclick="changeQuantity(${
    product.id
  })"><i class="fa-solid fa-trash-can"></i></div>
`;
}

// // Thuc hien chuc nang xoa
// function changeQuantity($idProduct) {
//   const productToDelete = document.querySelector(`[data-id="${$idProduct}"]`);

//   if (productToDelete && confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
//     productToDelete.remove(); // Xóa sản phẩm khỏi danh sách

//     delete listCart[$idProduct];
//     let timeSave = 'expries=Thu, 31 Dec 2025 23:59:59 UTC';
//     document.cookie =
//       'listCart=' + JSON.stringify(listCart) + '; ' + timeSave + '; path=/';
//     addCartToHTML();
//   }
// }
function changeQuantity($idProduct) {
  const productToDelete = document.querySelector(`[data-id="${$idProduct}"]`);

  if (productToDelete) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Xoá sản phẩm',
    }).then((result) => {
      if (result.isConfirmed) {
        // Nếu người dùng xác nhận xoá, thực hiện hành động xoá ở đây
        productToDelete.remove(); // Xóa sản phẩm khỏi danh sách

        delete listCart[$idProduct];
        let timeSave = 'expries=Thu, 31 Dec 2025 23:59:59 UTC';
        document.cookie =
          'listCart=' + JSON.stringify(listCart) + '; ' + timeSave + '; path=/';
        addCartToHTML();

        Swal.fire({
          icon: 'success',
          title: 'Xoá sản phẩm thành công!',
          showConfirmButton: false,
          timer: 1500, // Đóng tự động sau 1.5 giây
        });
      }
    });
  }
}

// Ket thuc thuc hien chuc nang xoa

function handleLoading(percent) {
  let progress = document.querySelector('.loading__inner-progress');
  let textPercent = document.querySelector('.loading__percent');
  progress.style.width = `${percent}%`;
  textPercent.innerText = `${percent}%`;
}

function hideLoading() {
  const loading = document.querySelector('.loading');
  const body = document.querySelector('body');
  loading.classList.add('--is-loaded');
  body.classList.remove('--disable-scroll');
}

function initLoading() {
  let loadedCount = 0;
  let imgs = document.querySelectorAll('img').length;
  let body = document.querySelector('body');

  let imgLoad = imagesLoaded(body);

  imgLoad.on('progress', (instance) => {
    loadedCount++;
    let percent = Math.floor((loadedCount / imgs) * 100);
    handleLoading(percent);
  });

  imgLoad.on('always', (instance) => {
    console.log('always');
  });
  imgLoad.on('done', (instance) => {
    console.log('done');
    hideLoading();
    // handleCarousel();
  });
  imgLoad.on('fail', function (instance) {
    console.log('fail');
  });
}
initLoading();
//End Loading ........

// Hienn thi logged
document.addEventListener('DOMContentLoaded', function () {
  var headerAdminText = document.querySelector('.header__admin-text');
  var headerAdminOut = document.querySelector('.header__admin-out');
  var btnCheckout = document.querySelector('.btnCheckout');
  var loggedInUsername = localStorage.getItem('loggedInUser');

  headerAdminOut.addEventListener('click', function () {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/index.html'; // Chuyển về trang index.html khi đăng xuất
    alert('Đăng xuất thành công'); // Thông báo đăng xuất thành công
  });

  if (loggedInUsername) {
    headerAdminText.textContent = 'Xin chào, ' + loggedInUsername;
    headerAdminOut.style.display = 'block';
  } else {
    headerAdminOut.style.display = 'none';
  }

  btnCheckout.addEventListener('click', function (e) {
    if (!loggedInUsername) {
      e.preventDefault(); // Ngăn chuyển trang mặc định
      alert('Bạn phải đăng nhập trước khi thanh toán');
      window.location.href = '/login.html';
    } else {
      getDataProduct();

      // Không cần chuyển trang ở đây để giữ người dùng ở trang hiện tại
    }
  });
});

function successfulPayment() {
  Swal.fire({
    icon: 'success',
    title: 'Đơn hàng thành công!',
    text: 'Cảm ơn bạn đã mua sắm!',
  });
}

const getFormattedDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
  return formattedDate;
};
let $a = document.querySelector.bind(document);
const getValueInput = () => {
  let fullName = $a('#fullname').value;
  let phoneNumber = $a('#phonenumber').value;
  let address = $a('#address').value;
  let email = $a('#email').value;
  return {
    fullName: fullName,
    phoneNumber: phoneNumber,
    address: address,
    email: email,
  };
};

const fullNameInput = $a('#fullname');
const phoneNumberInput = $a('#phonenumber');
const addressInput = $a('#address');
const emailInput = $a('#email');

const getDataInfo = (id) => {
  let promise = axios({
    url: 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/users/' + id,
    method: 'GET',
  });
  promise
    .then((result) => {
      fullNameInput.value = result.data.fullname;
      phoneNumberInput.value = result.data.phonenumber;
      //addressInput.value = result.data.address;
      emailInput.value = result.data.email;
    })
    .catch((error) => {
      console.log(error);
    });
};
document.addEventListener('DOMContentLoaded', () => {
  getDataInfo(idUserLogged);
});

const getDataProduct = () => {
  const btnSubmit = $a('.btnCheckout');
  btnSubmit.disabled = true;

  const getDate = getFormattedDate();
  const status = 0;
  const listProduct = Array.from(
    JSON.parse(document.cookie.replace('listCart=', ''))
  ).filter((itemCart) => itemCart);
  console.log(listProduct);
  let getData = getValueInput();
  let dataCheckOut = {
    fullname: getData.fullName,
    phonenumber: getData.phoneNumber,
    address: getData.address,
    email: getData.email,
    products: listProduct,
    date: getDate,
    status: status,
  };

  console.log(dataCheckOut);

  let promise = axios({
    url: 'https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/OderProduct',
    method: 'POST',
    data: dataCheckOut,
  });

  promise
    .then((data) => {
      successfulPayment();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      btnSubmit.disabled = false;
    });
};
