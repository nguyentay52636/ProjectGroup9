const $a = document.querySelector.bind(document);
const $all = document.querySelectorAll.bind(document);
export const checkEmpty = (value, message, notiID) => {
  if (value == '') {
    $a(notiID).innerHTML = message;
    $a(notiID).style.display = 'block';
    return false;
  } else {
    $a(notiID).innerHTML = '';
    $a(notiID).style.display = 'none';
    return true;
  }
};
export const checkEmail = (value, message, notiID) => {
  if (value == '') {
    return;
  } else {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(value)) {
      $a(notiID).innerHTML = message;
      $a(notiID).style.display = 'block';
      return false;
    } else {
      $a(notiID).innerHTML = '';
      $a(notiID).style.display = 'none';
      return true;
    }
  }
};
export const checkNumber = (value, message, notiID) => {
  if (value == '') {
    $a(notiID).innerHTML = message;
    $a(notiID).style.display = 'block';
    return false;
  } else {
    const regex = /^\d+$/; // Chuỗi regex chỉ chấp nhận số dương

    if (!regex.test(value)) {
      $a(notiID).innerHTML = message;
      $a(notiID).style.display = 'block';
      return false;
    } else {
      $a(notiID).innerHTML = '';
      $a(notiID).style.display = 'none';
      return true;
    }
  }
};
