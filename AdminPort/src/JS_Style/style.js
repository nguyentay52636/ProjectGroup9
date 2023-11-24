const $a = document.querySelector.bind(document);

$a('#innerProduct').onclick = (event) => {
  console.log(123);
  const content = $a('.content');
  content.style.display = 'none';
  $a('#content__product').style.display = 'block';
  $a('.content__acount').style.display = 'none';
  $a('#content__order').style.display = 'none';
};

$a('.active').onclick = () => {
  const content = $a('.content');
  content.style.display = 'block';
  $a('#content__product').style.display = 'none';
  $a('.content__acount').style.display = 'block';
  $a('.content').style.display = 'none';
};

function openModalPerson() {
  let modal = document.getElementById('myModalPerson');
  modal.style.display = 'block';
  document.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
}

function openModal() {
  let modal = document.getElementById('myModal');
  let modalPerson = $a('#myModalPerson');
  // Hiển thị cả hai modal
  modal.style.display = 'block';
  // modalPerson.style.display = 'none';

  // Đăng ký sự kiện cick bên ngoài modal
  document.addEventListener('click', function (event) {
    if (event.target == modal) {
      // Ẩn cả hai modal nếu click bên ngoài
      modal.style.display = 'none';
      modalPerson.style.display = 'none';
    }
  });
}

function closeBtn() {
  const ModaProduct = $a('#myModal');
  const ModalPerson = $a('#myModalPerson');

  if (ModalPerson) {
    ModalPerson.style.display = 'none';
  } else if (ModaProduct) {
    ModaProduct.style.display = 'none';
  }
}

$a('.btnCloseTab').addEventListener('click', () => {
  const textLogo1 = $a('.text__logo1');
  if ($a('.sidebar').style.width === '65px') {
    $a('#overLayout').style.width = '265px';
    //$a('.active').style.display = 'none';
    $a('.sidebar').style.width = '20%';
    $a('.btnCloseTab .fa-angle-left').style.display = 'block';
    $a('.btnCloseTab .fa-chevron-right').style.display = 'none';
    $a('.btnCloseTab').style.left = '265px';
    $a('.content__acount').style.marginLeft = '23px';
    $a('.nav').style.marginLeft = '14px';
    $a('.main').style.marginLeft = '150px';

    //$a('.nav .active').style.display = 'none';
    $a('.sidebar').classList.remove('smallMenu');
    $a('.text__logo').style.display = 'block';
  } else {
    $a('#overLayout').style.width = '65px';

    $a('.sidebar').style.width = '65px';
    // textLogo1.style.display = 'none';

    $a('.text__logo').style.display = 'none';
    $a('.sidebar').classList.add('smallMenu');
    $a('.btnCloseTab .fa-angle-left').style.display = 'none';
    $a('.btnCloseTab .fa-chevron-right').style.display = 'block';
    $a('.btnCloseTab').style.left = '50px';

    //$a('.active').style.display = 'none';
    $a('.main').style.margin = '60px';
  }
});

// $a('.sidebar').addEventListener('click', (event) => {
//   const { target } = event;

//   console.log(target);
//   const contentUser = $a('.content__acount');
//   const contentProduct = $a('#content__product');
//   const contentOrder = $a('#content__order');

//   const tables = [contentUser, contentProduct, contentOrder];

//   tables.map((table) => (table.style.display = 'none'));

//   switch (target) {
//     case contentProduct:
//       contentProduct.style.display = 'block';
//       break;
//     case contentOrder:
//       console.log(123);
//       contentOrder.style.display = 'block';
//       break;
//     case contentUser:
//       console.log(123);

//       contentUser.style.display = 'block';
//       break;
//     default:
//   }
// });

function changeTable(table) {
  const { id } = table;
  const contentUser = $a('.content__acount');
  const contentProduct = $a('#content__product');
  const contentOrder = $a('#content__order');
  const tables = [contentUser, contentProduct, contentOrder];
  tables.map((table) => (table.style.display = 'none'));
  switch (id) {
    case 'tableProduct':
      contentProduct.style.display = 'block';
      break;
    case 'tableOrder':
      contentOrder.style.display = 'block';
      break;
    case 'tableUser':
      contentUser.style.display = 'block';
      break;
    default:
  }
}
$a('#btnSplit').addEventListener('click', () => {
  $a('#ModalNotify').style.display = 'none';
  btnSplit;
});
