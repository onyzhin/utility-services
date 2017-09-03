/* eslint-disable no-mixed-operators */

function getter(id) {
  var data = localStorage.getItem(id);

  return data && JSON.parse(data) || {};
}

function setter(id, data) {
  localStorage.setItem(id, JSON.stringify(data));

  return true;
}

export function getUserInfo() {
  return getter('userInfo');
}

export function setUserInfo(data) {
  return setter('userInfo', data);
}
