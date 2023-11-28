import callApiOrder from '../Controller/callApiOrder.js';
const $a = document.querySelector.bind(document);
const $all = document.querySelectorAll.bind(document);

let api = new callApiOrder();
let orders = [];

const handleRenderOrder = (data) => {
  let tableOrder = $a('#listOrder');
  let contentOrder = data.reduce((prev, order) => {
    return prev + innerOrder(order);
  }, '');
  tableOrder.innerHTML = contentOrder;
};
const innerOrder = (order) => {
  const { id, fullname, phonenumber, products, address, date,email, status } = order;
  return `<tr>
  <td>${id}</td>
  <td>${fullname}</td>
  <td>${products.reduce((prev, product) => {
    return `${prev !== '' ? `${prev},` : ''} ${product.name}`;
  }, '')}</td>
  <td>${products.reduce((prev, product) => {
    return prev + +product.price * product.quantity;
  }, 0)}</td>
  <td>${date}</td>
  <td>${phonenumber}</td>
  <td>${address}</td>
  <td>${email}</td>
   <td>${
     status == 0 ? 'Đợi xử lí' : status == 1 ? 'Đã xử lí' : 'Đã huỷ đơn'
   }</td>
   <td id="btnContact">
  <button id="deleteOrder" idOrder="${id}" class="fa-solid fa-trash"></button>
   <button id="confirmOrder" idOrder="${id}" class="fa-solid fa-check"></button> </td>
</tr>`;
};
//<button id="confirmOrder" idOrder="${id}"><i class="fa-solid fa-check"></i></button> </td>
//Get action order
// const getActionButton = (id, status) => {
//   switch (status) {
//     case 'Hủy Đơn Hàng':
//       return `<button id="deleteOrder" idOrder="${id}"><i class="fa-solid fa-trash"></i></button>`;
//     case 'Chấp Nhận':
//       return `<button class="border-0 p-2 btn-danger" style="cursor: pointer;" onclick="ReviewOrder(${id})">Review</button>`;
//     default:
//       return `
//         <button class="border-0 p-2 btn-danger" style="cursor: pointer;" onclick="RefuseOrder(${id})">Từ Chối</button>
//         <button class="border-0 p-2 btn-danger" style="cursor: pointer;" onclick="CheckOrder(${id})">CheckOrder</button>
//       `;
//   }
// };

//    currentDae: currentDate,

const getListOrder = async () => {
  try {
    let result = await api.fetchData();
    orders = result.data;
    handleRenderOrder(orders);
  } catch (error) {
    console.log(error);
  }
};
getListOrder();

//search order
const searchOrder = () => {
  const inputOrder = $a('#searchOrder').value;
  const fiflterOrder = orders.filter((order) => {
    return (
      order.fullname.toLowerCase().includes(inputOrder.toLowerCase()) ||
      order.phonenumber.toString().includes(inputOrder)
    );
    handleRenderOrder(fiflterOrder);
  });
};
$a('#searchOrder').addEventListener('input', searchOrder);
// const deleteOrder = async (id) => {
async function deleteOrder(id) {
  const result = await Swal.fire({
    title: 'Bạn có chắc chắn muốn xóa đơn hàng?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Đồng ý',
    cancelButtonText: 'Hủy',
  });

  if (result.isConfirmed) {
    // Nếu người dùng đồng ý, thực hiện xóa đơn hàng
    deleteOrderAsync(id);
  }
}

async function deleteOrderAsync(id) {
  try {
    let result = await api.deleteOrder(id);
    getListOrder(result);
    NotiAlert('success', 'Xóa đơn hàng thành công', 2000);
  } catch (error) {
    NotiAlert('Failed to delete order. Please try again.', 'error');
  }
}

$a('#listOrder').addEventListener('click', (event) => {
  // event.preventDefault();
  const id = event.target.id;
  const idOrder = event.target.getAttribute('idOrder');
  switch (id) {
    case 'deleteOrder':
      deleteOrder(idOrder);
      break;
    case 'confirmOrder':
      $a('#ModalNotify').style.display = 'block';
      checkOrder(idOrder);
  }
});
// $a('#form-groupBtn').addEventListener('click', async (e) => {
//   const idClick = e.target.id;
//   const idbtnClose = e.target.getAttribute('btnSplit');
//   const idbtnConfirm = e.target.getAttribute('btnConfirm');

//   switch (idClick) {
//     case 'btnClose':
//       $a('#ModalNotify').style.display = 'none';
//       break;
//     case 'btnConfirm':
//       try {
//         await refuseOrder({ id: idbtnConfirm });
//         // Nếu không có lỗi, có thể gọi getListOrder tại đây nếu cần
//         // getListOrder();
//       } catch (error) {
//         console.error(error);
//       }
//       break;
//   }
// });

// $a('#btnConfirm').addEventListener('click', (data) => {
//   const orderID = data.id;
//   confirmOrder(orderID);
// });

// // convert status
// const UpdaterefuseOrder = async (id, newStatus) => {
//   try {
//     const order = await api.getInfoOrder(id);
//     if (order.data.status === 'Đợi xử lý') {
//       order.data.status = newStatus;
//       await api.editOrder(id, order.data);
//       NotiAlert('success', 'Đơn hàng đã được chấp nhận', 2000);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const confirmOrder = async (orderID) => {
//   try {
//     await UpdaterefuseOrder(orderID, 'Đã xử lí');
//     getListOrder();
//   } catch (error) {
//     console.log(error);
//   }
// };

const getInfoOrder = (data) => {
  $a('#NotiName').textContent = data.fullname;

  const productsText = data.products.reduce((prev, product) => {
    return `${prev !== '' ? `${prev}, ` : ''}${product.name}`;
  }, '');
  $a('#NotiProduct').textContent = productsText;

  const totalPrice = data.products.reduce((prev, product) => {
    return prev + +product.price * product.quantity;
  }, 0);
  $a('#NotiPrice').textContent = `${totalPrice}`;

  $a('#NotiPhone').textContent = data.phonenumber;
  $a('#NotiAddress').textContent = data.address;
  $a('#NotiDate').textContent = data.date;
  $a('#NotiStatus').innerHTML = `<select name="" idOrder="${
    data.id
  }" id="selectStatus">
    <option value="0">Đợi xử lí</option>
    <option value="1" 
      ${data.status == 1 ? 'selected' : ''}
    >Đã xử lí </option>
    <option value="2" ${data.status == 2 ? 'selected' : ''}>Đã huỷ đơn</option>
</select>`;
};
const checkOrder = async (id) => {
  try {
    let result = await api.getInfoOrder(id);
    getInfoOrder(result.data);
  } catch (error) {
    console.log(error);
  }
};

const updateStatus = async (id, valueSelect) => {
  try {
    const orderByID = orders.find((order) => order.id === id);
    orderByID.status = valueSelect;
    let order = await api.editOrder(id, orderByID);
    getListOrder();
  } catch (error) {
    console.log(error);
  }
};
$a('#ModalNotify').addEventListener('change', (e) => {
  const id = e.target.getAttribute('idOrder');
  const valueSelect = e.target.value;
  updateStatus(id, valueSelect);
});
function NotiAlert(icon, title, timer) {
  Swal.fire({
    position: 'center',
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: timer,
  });
}
