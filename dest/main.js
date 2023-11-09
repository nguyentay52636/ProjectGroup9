// Schero
let handlehero = () => {
  let slider = document.querySelector('.schero__list');
  if (slider) {
    let flktySlider = new Flickity(slider, {
      // options
      cellAlign: 'left',
      contain: true,
      draggable: '>1',
      wrapAround: true,
      prevNextButtons: false,
      autoPlay: 3000,
      selectedAttraction: 0.01,
      friction: 0.3,
      // pageDots: false,
      on: {
        ready: function () {
          console.log('Flickity is ready');
        },
        // change: function (index) {
        //   console.log("Slide changed to" + index);
        //   handleNumber(index);
        // },
      },
    });
  }
};
handlehero();

//handlePopup
let handlePopup = () => {
  let popup = document.querySelector('.popup');
  if (popup) {
    let videoArray = document.querySelectorAll(
      '.scevent .scevent__list .scevent__list-item'
    );
    let iframe = document.querySelector(
      '.popup .popup__video .popup__video-frame iframe'
    );
    let iconClose = document.querySelector(
      '.popup .popup__video .popup__video-frame .iconClose'
    );
    videoArray.forEach((item) => {
      item.addEventListener('click', () => {
        popup.classList.add('--is-active');
        let dataID = item.getAttribute('data-video');
        // console.log(dataID);
        iframe.setAttribute(
          'src',
          `https://www.youtube.com/embed/${dataID}?autoplay=1`
        );
      });
    });

    let hidePopup = () => {
      popup.classList.remove('--is-active');
      iframe.setAttribute('src', '');
    };
    iconClose.addEventListener('click', hidePopup);
    popup.addEventListener('click', hidePopup);
  }
};
handlePopup();
//end handlePopup

//scroll to top
let backTop = () => {
  const backTop = document.querySelector('.btnScroll');
  backTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
};
backTop();

//scroll header
let scrollHeader = () => {
  const header = document.querySelector('.nav');
  const schero = document.querySelector('.schero');
  const arrayA = document.querySelector('.nav__list-item a');
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll >= schero.offsetHeight + header.offsetHeight) {
      header && header.classList.add('--is-active');
    } else {
      header && header.classList.remove('--is-active');
    }
  });
};
scrollHeader();
//end scroll header = ()

// Handle ProgressBar
let handleProgressBar = () => {
  let progress = document.querySelector('.progressbar');
  window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;
    let percent =
      (scrollY / (document.body.offsetHeight - window.innerHeight)) * 100;
    progress.style.width = `${percent}%`;
  });
};
window.addEventListener('load', handleProgressBar());
// End Handle ProgressBar

//Loading ........
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

// const handleCarousel = () => {
//   let slider = document.querySelector(".scproducts__list");

//   let flktySlider = new Flickity(slider, {
//     // options
//     cellAlign: "left",
//     contain: true,
//     draggable: '>1',
//     wrapAround: true,
//     prevNextButtons: false,
//     pageDots: false,
//     autoPlay: 2000,
//     // lazyLoad: true,
//   });

//   var $carousel = $('.scproducts__list').flickity();

//   var $progressBar = $('.line__hidden');

//   $carousel.on( 'scroll.flickity', function( event, progress ) {
//     progress = Math.max( 0, Math.min( 1, progress ) );
//     $progressBar.width( progress * 100 + '%' );
//   });
// }
// handleCarousel();

let handleCartNav = () => {
  // CARTNAV
  let cart = document.querySelector('.cartNav');
  let iconCart = document.querySelector('.header__shop-item.--cart');
  let close = document.querySelector('.cartNav .close');

  let container = document.querySelector('.container');
  let containerHeader = document.querySelector(
    '.header .header__bottom .container'
  );
  let containerHeaderTop = document.querySelector(
    '.header .header__top .container'
  );
  let containerFooter = document.querySelector('.footer .container');
  let containerScproducts = document.querySelector('.scproducts .container');
  let containerScservice = document.querySelector('.scservice .container');
  let containerSchotdeal = document.querySelector('.schotdeal .container');
  let containerScevent = document.querySelector('.scevent .container');
  let containerScsign = document.querySelector('.scsign .container');

  // kiem tra truoc khi else
  if (cart.style.right != '-100%') {
    handleCartFirst();
  }
  function handleCartFirst() {
    cart.style.right = '-100%';
    if (containerScproducts) {
      containerScproducts.style.transform = 'translateX(0)';
    }
    if (containerScservice) {
      containerScservice.style.transform = 'translateX(0)';
    }
    if (container) {
      container.style.transform = 'translateX(0)';
    }
    if (containerSchotdeal) {
      containerSchotdeal.style.transform = 'translateX(0)';
    }
    if (containerScevent) {
      containerScevent.style.transform = 'translateX(0)';
    }
    if (containerScsign) {
      containerScsign.style.transform = 'translateX(0)';
    }
    if (containerHeader) {
      containerHeader.style.transform = 'translateX(0)';
    }
    if (containerFooter) {
      containerFooter.style.transform = 'translateX(0)';
    }
  }

  iconCart.addEventListener('click', () => {
    if (cart.style.right == '-100%') {
      cart.style.right = '0';
      if (containerScproducts) {
        containerScproducts.style.transform = 'translateX(-400px)';
      }
      if (containerScservice) {
        containerScservice.style.transform = 'translateX(-400px)';
      }
      if (container) {
        container.style.transform = 'translateX(-400px)';
      }
      if (containerSchotdeal) {
        containerSchotdeal.style.transform = 'translateX(-400px)';
      }
      if (containerScevent) {
        containerScevent.style.transform = 'translateX(-400px)';
      }
      if (containerScsign) {
        containerScsign.style.transform = 'translateX(-400px)';
      }
      if (containerHeader) {
        containerHeader.style.transform = 'translateX(-400px)';
      }
      if (containerFooter) {
        containerFooter.style.transform = 'translateX(-400px)';
      }
    } else {
      handleCartFirst();
    }
  });
  // Đóng cửa sổ giỏ hàng
  close.addEventListener('click', () => {
    handleCartFirst();
  });
};
handleCartNav();

//============== GET DATA FORM PRODUCTS.JSON ==============
let products = null;
fetch('http://127.0.0.1:5500/database.json')
  .then((response) => response.json())
  .then((data) => {
    products = data;
    addDatatoHTML();
    // console.log(products);
  });
let listCart = [];
// De sau khi call api ve
function checkCart() {
  var cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('listCart='));
  if (cookieValue) {
    // Sử dụng toàn bộ cookieValue làm dữ liệu JSON
    listCart = JSON.parse(cookieValue.replace('listCart=', ''));
  }
}
checkCart();
// add data product to HTML
const addDatatoHTML = () => {
  //remove datat defautl in html
  let listProductHTML = document.querySelector('.scproducts__list');
  listProductHTML.innerHTML = '';
  // add new data
  if (products != null) {
    products.forEach((product) => {
      let newProduct = document.createElement('a');
      // id cua moi san pham
      newProduct.href = '/detail.html?id=' + product.id;
      newProduct.classList.add('item');
      newProduct.innerHTML = `
        <div class="img">
        <img src="${product.img}" alt="" />
        <div class="label">
          <span class="label__discount">-30%</span>
          <span class="label__tag">NEW</span>
        </div>
      </div>
      <div class="content">
        <span class="des">CATEGORY</span>
        <h3 class="title">${product.name}</h3>
        <div class="prices">
          <span class="prices__new">$${product.price}</span>
          <span class="prices__old">$1,959</span>
        </div>
        <div class="rating">
          <i class="fa-solid fa-star icon"></i>
          <i class="fa-solid fa-star icon"></i>
          <i class="fa-solid fa-star icon"></i>
          <i class="fa-solid fa-star icon"></i>
          <i class="fa-solid fa-star icon"></i>
        </div>
        <div class="btns">
          <div class="btns__icon">
            <i class="fa-regular fa-heart icon"></i>
          </div>
          <div class="btns__icon">
            <i class="fa-solid fa-arrow-right-arrow-left icon"></i>
          </div>
          <div class="btns__icon">
            <i class="fa-solid fa-eye icon"></i>
          </div>
        </div>
      </div>
      <div class="cart">
        <button class="cart__btn" onclick="addCart(${product.id}, event)">
          <i class="fa-solid fa-cart-shopping icon"></i>
          <span>ADD TO CART</span>
        </button>
      </div>
        `;
      listProductHTML.appendChild(newProduct);
    });
  }
  // Phan trang
  handlePage();
};
//======== END  GET DATA FORM PRODUCTS.JSON ========

//===== Xu ly gio hang Cart =========
function addCart($idProduct, event) {
  event.preventDefault();
  let productCopy = JSON.parse(JSON.stringify(products));
  //if this product is not in cart
  if (!listCart[$idProduct]) {
    let dataProduct = productCopy.filter(
      (product) => product.id == $idProduct
    )[0];
    //add data product in cart
    listCart[$idProduct] = dataProduct;
    listCart[$idProduct].quantity = 1;
  } else {
    //if this product is already in the cart
    // i just increased the quantity
    listCart[$idProduct].quantity++;
  }
  // i wiwll save datas cart in cookie
  // to save yhis datas cart when i turn of the computer
  let timeSave = 'expries=Thu, 31 Dec 2025 23:59:59 UTC';
  document.cookie =
    'listCart=' + JSON.stringify(listCart) + '; ' + timeSave + '; path=/';
  addCarttoHTML();
}

function addCarttoHTML() {
  //clear data default;
  let listCartHTML = document.querySelector('.listCart');
  listCartHTML.innerHTML = '';

  let totalHTML = document.querySelector('.totalQuantity');
  let totalQuantity = 0;

  if (listCart) {
    listCart.forEach((product) => {
      if (product) {
        let newCart = document.createElement('div');
        newCart.classList.add('item');
        newCart.innerHTML = `
        <div class="img">
        <img src="${product.img}" alt="" />
      </div>
          <div class="content">
            <div class="name">${product.name}</div>
            <div class="price">${product.price}$ </div>
          </div>
          <div class="quantity">
            <button class="oper" onclick="changeQuantity(${product.id},'-')">-</button>
            <span class="value">${product.quantity}</span>
            <button class="oper" onclick="changeQuantity(${product.id},'+')">+</button>
          </div>`;
        listCartHTML.appendChild(newCart);
        totalQuantity = totalQuantity + product.quantity;
      }
    });
  }

  totalHTML.innerText = totalQuantity;
}
addCarttoHTML();

function changeQuantity($idProduct, $type) {
  switch ($type) {
    case '+':
      listCart[$idProduct].quantity++;
      break;
    case '-':
      listCart[$idProduct].quantity--;
      if (listCart[$idProduct].quantity <= 0) {
        delete listCart[$idProduct];
      }
      break;
    default:
      break;
  }
  //save new cookie
  let timeSave = 'expries=Thu, 31 Dec 2025 23:59:59 UTC';
  document.cookie =
    'listCart=' + JSON.stringify(listCart) + '; ' + timeSave + '; path=/';
  //reload
  addCarttoHTML();
}
// ======== Ket thuc Xu ly gio hang Cart ========

// ======== *HAM XU LY PHAN TRANG =======
// Khai bao global
let thisPage = 1;
let limit = 4;

function handlePage() {
  let list = document.querySelectorAll('.scproducts__list .item');
  // Hien thi so luong item da cai dat
  function loadItem() {
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;
    list.forEach((item, key) => {
      if (key >= beginGet && key <= endGet) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
    listPage();
  }
  loadItem();

  // Hien thi tong so trang
  function listPage() {
    let count = Math.ceil(list.length / limit);
    let listPageContainer = document.querySelector('.listPage');
    listPageContainer.innerHTML = '';

    // Nut prev
    if (thisPage > 1) {
      let prev = document.createElement('li');
      let icon = document.createElement('i');
      prev.classList.add('fa-solid', 'fa-arrow-left');
      prev.appendChild(icon);
      prev.addEventListener('click', function () {
        changePage(thisPage - 1);
      });
      listPageContainer.appendChild(prev);
    }

    // Hien thi so nut
    for (let i = 1; i <= count; i++) {
      let newPage = createPageElement(i);
      listPageContainer.appendChild(newPage);
    }

    // Nut next
    if (thisPage < count) {
      let next = document.createElement('li');
      let icon = document.createElement('i');
      icon.classList.add('fa-solid', 'fa-arrow-right');
      next.appendChild(icon);
      next.addEventListener('click', function () {
        changePage(thisPage + 1);
      });
      listPageContainer.appendChild(next);
    }
  }

  function createPageElement(i) {
    let newPage = document.createElement('li');
    newPage.innerText = i;
    if (i === thisPage) {
      newPage.classList.add('--is-active');
    }
    // Sử dụng hàm `changePage` để xử lý sự kiện click
    newPage.addEventListener('click', function () {
      changePage(i);
    });
    return newPage;
  }

  function changePage(i) {
    if (i >= 1 && i <= Math.ceil(list.length / limit)) {
      thisPage = i;
      loadItem();
    }
  }
}
handlePage();
//  ======== Ket thuc XU LY PHAN TRANG =======

//==== Bo loc ====
let list = document.querySelector('.scproducts__list');
let filter = document.querySelector('.filter');
let count = document.getElementById('count');
let productFilter = [];
let listProducts = [];

fetch('https://650f9b0d54d18aabfe9a203b.mockapi.io/api/v1/capstonejs')
  .then((response) => response.json())
  .then((data) => {
    listProducts = data;
    productFilter = data;
    showProduct(productFilter);
  });

// Ham dat trong fecth de lay api ve
function showProduct(productFilter) {
  count.innerText = productFilter.length;
  list.innerHTML = '';
  productFilter.forEach((product) => {
    let newProduct = document.createElement('a');
    // id cua moi san pham
    newProduct.href = '/detail.html?id=' + product.id;
    newProduct.classList.add('item');
    newProduct.innerHTML = `
        <div class="img">
        <img src="${product.img}" alt="" />
        <div class="label">
          <span class="label__discount">-30%</span>
          <span class="label__tag">NEW</span>
        </div>
      </div>
      <div class="content">
        <span class="des">CATEGORY</span>
        <h3 class="title">${product.name}</h3>
        <div class="prices">
          <span class="prices__new">$${product.price}</span>
          <span class="prices__old">$1,959</span>
        </div>
        <div class="rating">
          <i class="fa-solid fa-star icon"></i>
          <i class="fa-solid fa-star icon"></i>
          <i class="fa-solid fa-star icon"></i>
          <i class="fa-solid fa-star icon"></i>
          <i class="fa-solid fa-star icon"></i>
        </div>
        <div class="btns">
          <div class="btns__icon">
            <i class="fa-regular fa-heart icon"></i>
          </div>
          <div class="btns__icon">
            <i class="fa-solid fa-arrow-right-arrow-left icon"></i>
          </div>
          <div class="btns__icon">
            <i class="fa-solid fa-eye icon"></i>
          </div>
        </div>
      </div>
      <div class="cart">
        <button class="cart__btn" onclick="addCart(${product.id}, event)">
          <i class="fa-solid fa-cart-shopping icon"></i>
          <span>ADD TO CART</span>
        </button>
      </div>
        `;
    list.appendChild(newProduct);
  });
  handlePage();
}

filter.addEventListener('submit', function (event) {
  event.preventDefault();
  let valueFilter = event.target.elements;
  productFilter = listProducts.filter((item) => {
    if (valueFilter.category.value != '') {
      if (item.type != valueFilter.category.value) {
        return false;
      }
    }
    if (valueFilter.name.value != '') {
      if (
        !item.name.toLowerCase().includes(valueFilter.name.value.toLowerCase())
      ) {
        return false;
      }
    }
    if (valueFilter.minPrice.value != '') {
      if (parseInt(item.price) < parseInt(valueFilter.minPrice.value)) {
        return false;
      }
    }
    if (valueFilter.maxPrice.value != '') {
      if (parseInt(item.price) > parseInt(valueFilter.maxPrice.value)) {
        return false;
      }
    }

    return true;
  });
  valueFilter.category.value = '';
  valueFilter.name.value = '';
  valueFilter.minPrice.value = '';
  valueFilter.maxPrice.value = '';

  showProduct(productFilter);
});
//==== End Bo loc ====
// Hienn thi logged
// document.addEventListener('DOMContentLoaded', function () {
//   var headerAdminText = document.querySelector('.header__admin-text');
//   var headerAdminOut = document.querySelector('.header__admin-out');

//   headerAdminOut.addEventListener('click', function () {
//     // Xóa thông tin đăng nhập khỏi localStorage
//     localStorage.removeItem('loggedInUser');

//     // Ẩn phần tử headerAdminOut và hiển thị phần tử mặc định
//     headerAdminOut.style.display = 'none';
//     headerAdminText.innerHTML = `<a style="color: #fff; cursor: pointer;" href="/login.html">Login</a>`; // Hoặc đặt giá trị mặc định khác
//     Swal.fire({
//       position: 'center',
//       icon: 'success',
//       title: 'Đăng xuất thành công',
//       showConfirmButton: false,
//       timer: 1000,
//     });
//   });

//   var loggedInUsername = localStorage.getItem('loggedInUser');
//   if (loggedInUsername) {
//     headerAdminText.textContent = 'Xin chào, ' + loggedInUsername;
//     headerAdminOut.style.display = 'block';
//   } else {
//     headerAdminOut.style.display = 'none';
//   }
// });
document.addEventListener('DOMContentLoaded', function () {
  var headerAdminText = document.querySelector('.header__admin-text');
  var headerAdminOut = document.querySelector('.header__admin-out');

  headerAdminOut.addEventListener('click', function () {
    // Thêm thông báo xác nhận trước khi đăng xuất
    Swal.fire({
      title: 'Bạn chắc chắn muốn đăng xuất?',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
      container: 'my-swal',
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa thông tin đăng nhập khỏi localStorage
        localStorage.removeItem('loggedInUser');

        // Ẩn phần tử headerAdminOut và hiển thị phần tử mặc định
        headerAdminOut.style.display = 'none';
        headerAdminText.innerHTML = `<a style="color: #fff; cursor: pointer;" href="/login.html">Login</a>`; // Hoặc đặt giá trị mặc định khác
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Đăng xuất thành công',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  });

  var loggedInUsername = localStorage.getItem('loggedInUser');
  if (loggedInUsername) {
    headerAdminText.textContent = 'Xin chào, ' + loggedInUsername;
    headerAdminOut.style.display = 'block';
  } else {
    headerAdminOut.style.display = 'none';
  }
});
