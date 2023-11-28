var apiOrder = new CallApiOrder();
var Order = [];
function getListOrder() {
    var promise = apiOrder.fectchData();
    promise
        .then(function (result) {
            Order = result.data;
            renderOrder(Order);
        })
        .catch(function (error) {
            console.log(error);
        })
}
getListOrder();
function renderOrder(data) {
    var tableOrder = document.querySelector('#tableDanhSachOrder');
    var s = '';
    for (var i = 0; i < data.length; i++) {
        var tempOrder = data[i];
        if (tempOrder.trangthai == 'Hủy Đơn Hàng') {
            s += `
            <tr class="h5" style="font-size:1.4rem ;">
                <td>${tempOrder.namebuy}</td>
                <td>${tempOrder.nameproduct}</td>
                <td>${tempOrder.address}</td>
                <td>${tempOrder.phone}</td>
                <td>${tempOrder.totalAmount}.000đ</td>
                <td>${tempOrder.date}</td>
                <td>${tempOrder.trangthai}</td>
                <td class="action_${tempOrder.id}">
                    Đơn Hàng Đã Hủy
                </td>
            </tr>
            `
        }else if (tempOrder.trangthai == 'Chấp Nhận') {
            s += `
            <tr class="h5" style="font-size:1.4rem ;">
                <td>${tempOrder.namebuy}</td>
                <td>${tempOrder.nameproduct}</td>
                <td>${tempOrder.address}</td>
                <td>${tempOrder.phone}</td>
                <td>${tempOrder.totalAmount}.000đ</td>
                <td>${tempOrder.date}</td>
                <td>${tempOrder.trangthai}</td>
                <td class="action_${tempOrder.id}">
                    <button class="border-0 p-2 btn-danger " style="cursor: pointer;" onclick= "ReviewOrder(${tempOrder.id})" >Review</button>
                </td>
            </tr>
            `
        } else {
            s += `
            <tr class="h5" style="font-size:1.4rem ;">
                <td>${tempOrder.namebuy}</td>
                <td>${tempOrder.nameproduct}</td>
                <td>${tempOrder.address}</td>
                <td>${tempOrder.phone}</td>
                <td>${tempOrder.totalAmount}.000đ</td>
                <td>${tempOrder.date}</td>
                <td>${tempOrder.trangthai}</td>
                <td class="action_${tempOrder.id}">
                    <button class="border-0 p-2 btn-danger" style="cursor: pointer;" onclick = "RefuseOrder(${tempOrder.id})">Từ Chối</button>
                    <button class="border-0 p-2 btn-danger " style="cursor: pointer;" onclick= "CheckOrder(${tempOrder.id})" >CheckOrder</button>
                </td>
            </tr>
            `
        }

    }
    tableOrder.innerHTML = s;
}

function RefuseOrder(id) {
    var Info = {
        trangthai: "Hủy Đơn Hàng"
    }
    var promise = apiOrder.editOrder(id, Info);
    promise
        .then(function () {
            getListOrder()

            NotiAlert('error', "Từ Chối Thành Công", 1500)
        })
        .catch(function (error) {
            console.log(error);
        })
}

function NotiAlert(icon, title, timer) {
    Swal.fire({
        position: "center",
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: timer
    })
}
function InfoOrder(data) {
    document.getElementById('infoNameBuy').innerHTML = data.namebuy;
    document.getElementById('infoAddress').innerHTML = data.address;
    document.getElementById('infoPhone').innerHTML = data.phone;
    document.getElementById('infoNameProduct').innerHTML = data.nameproduct;
    document.getElementById('infoToTalAmount').innerHTML = data.totalAmount + ".000đ";
    document.getElementById('infoTrangThai').innerHTML = data.trangthai;
    document.getElementById('infoTime').innerHTML = data.date
    document.querySelector('.modal-order').style.display = 'block';
    document.querySelector('.modal-order').classList.remove('fade');
    document.querySelector('.btnAddUpdateOrder').innerHTML = `<button id="btnAddOrder" type="button" class="btn btn-success" onclick="confirmOrder(${data.id})">Xác Nhận Đơn Hàng</button>`
}
function CheckOrder(id) {
    var promise = apiOrder.getOrder(id);
    promise
        .then(function (result) {
            InfoOrder(result.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}
function confirmOrder(id) {
    var Info = {
        trangthai: "Chấp Nhận"
    }
    var promise = apiOrder.editOrder(id, Info);
    promise
        .then(function () {
            getListOrder()
            document.querySelector('.modal-order').style.display = 'none';
            document.querySelector('.modal-order').classList.add('fade');
            NotiAlert('success', "Xác Nhận Đơn Hàng Thành Công", 1500)
        })
        .catch(function (error) {
            console.log(error);
        })
}
function ReviewInfoOrder(data) {
    document.getElementById('infoNameBuy').innerHTML = data.namebuy;
    document.getElementById('infoAddress').innerHTML = data.address;
    document.getElementById('infoPhone').innerHTML = data.phone;
    document.getElementById('infoNameProduct').innerHTML = data.nameproduct;
    document.getElementById('infoToTalAmount').innerHTML = data.totalAmount + ".000đ";
    document.getElementById('infoTrangThai').innerHTML = data.trangthai;
    document.getElementById('infoTime').innerHTML = data.date
    document.querySelector('.modal-order').style.display = 'block';
    document.querySelector('.modal-order').classList.remove('fade');
    document.querySelector('.btnAddUpdateOrder').innerHTML = ``

}
function ReviewOrder(id){
    var promise = apiOrder.getOrder(id);
    promise
        .then(function (result) {
            ReviewInfoOrder(result.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}