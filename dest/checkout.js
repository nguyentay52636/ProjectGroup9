let listCart = [];
// get data cart form cookie

function checkCart() {
  var cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("listCart="));
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split("=")[1]);
  }
}
checkCart();

addCartToHTML();
function addCartToHTML() {
  //clear data form html
  let listCartHTML = document.querySelector(".returnCart .list");
  listCartHTML.innerHTML = "";
  let totalQuantityHTML = document.querySelector(".totalQuantity");
  let totalPriceHTML = document.querySelector(".totalPrice");

  let totalQuantity = 0;
  let totalPrice = 0;

  if (listCart) {
    listCart.forEach((product) => {
      if (product) {
        let newProduct = document.createElement("div");
        newProduct.classList.add("item");
        newProduct.setAttribute("data-id", product.id);
        newProduct.innerHTML = `
          <img src="${product.img}" alt="" />
          <div class="info">
            <div class="name">${product.name}</div>
            <div class="price">${product.price}$</div>
          </div>
          <p class="quantity">${product.quantity}</p>
          <p class="returnPrice">${product.price * product.quantity}$</p>
          <div class="btnDelete" onclick="changeQuantity(${product.id})"><i class="fa-solid fa-trash-can"></i></div>
          `;
        listCartHTML.appendChild(newProduct); // Sử dụng .appendChild(newProduct) thay vì .appenChild(newP)

        totalQuantity += product.quantity;
        totalPrice += product.price * product.quantity;
      }
    });
  }
  totalQuantityHTML.innerText = totalQuantity;
  totalPriceHTML.innerText = totalPrice + "$";
}

// Thuc hien chuc nang xoa
function changeQuantity($idProduct) {
  const productToDelete = document.querySelector(`[data-id="${$idProduct}"]`);
  
  if (productToDelete && confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
    productToDelete.remove(); // Xóa sản phẩm khỏi danh sách

    delete listCart[$idProduct];
    let timeSave = "expries=Thu, 31 Dec 2025 23:59:59 UTC";
    document.cookie =
      "listCart=" + JSON.stringify(listCart) + "; " + timeSave + "; path=/";
    addCartToHTML();
  }
}
// Ket thuc thuc hien chuc nang xoa


function handleLoading(percent) {
  let progress = document.querySelector(".loading__inner-progress");
  let textPercent = document.querySelector(".loading__percent");
  progress.style.width = `${percent}%`;
  textPercent.innerText = `${percent}%`;
}

function hideLoading() {
  const loading = document.querySelector(".loading");
  const body = document.querySelector("body");
  loading.classList.add("--is-loaded");
  body.classList.remove("--disable-scroll");
}

function initLoading() {
  let loadedCount = 0;
  let imgs = document.querySelectorAll("img").length;
  let body = document.querySelector("body");

  let imgLoad = imagesLoaded(body);

  imgLoad.on("progress", (instance) => {
    loadedCount++;
    let percent = Math.floor((loadedCount / imgs) * 100);
    handleLoading(percent);
  });

  imgLoad.on("always", (instance) => {
    console.log("always");
  });
  imgLoad.on("done", (instance) => {
    console.log("done");
    hideLoading();
    // handleCarousel();
  });
  imgLoad.on("fail", function (instance) {
    console.log("fail");
  });
}
initLoading();
//End Loading ........

// Hienn thi logged
document.addEventListener("DOMContentLoaded", function () {
  var headerAdminText = document.querySelector(".header__admin-text");
  var headerAdminOut = document.querySelector(".header__admin-out");
  var btnCheckout = document.querySelector(".btnCheckout");
  var loggedInUsername = localStorage.getItem("loggedInUser");

  headerAdminOut.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/index.html"; // Chuyển về trang index.html khi đăng xuất
    alert("Đăng xuất thành công"); // Thông báo đăng xuất thành công
  });

  if (loggedInUsername) {
    headerAdminText.textContent = "Xin chào, " + loggedInUsername;
    headerAdminOut.style.display = "block";
  } else {
    headerAdminOut.style.display = "none";
  }

  btnCheckout.addEventListener("click", function (e) {
    if (!loggedInUsername) {
      e.preventDefault(); // Ngăn chuyển trang mặc định
      alert("Bạn phải đăng nhập trước khi thanh toán");
      window.location.href = "/login.html";
    } else {
      alert("Thanh toán thành công");
      // Không cần chuyển trang ở đây để giữ người dùng ở trang hiện tại
    }
  });
});
