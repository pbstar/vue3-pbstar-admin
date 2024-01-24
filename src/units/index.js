import config from "@/config";
function isMobile() {
  let m =
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
  return navigator.userAgent.match(m);
}
function strToBase64(str) {
  if (str) {
    let encode = encodeURI(str);
    let base64 = btoa(encode);
    return base64;
  }
}
function base64ToStr(base64) {
  if (base64) {
    let decode = atob(base64);
    let str = decodeURI(decode);
    return str;
  }
}
function getLocalStorage(name) {
  if (name) {
    let value = localStorage.getItem(config.proName + '-' + name);
    if (!value || value === "undefined" || value === "null") return "";
    return base64ToStr(value);
  }
}
function setLocalStorage(name, value) {
  if (name) {
    if (!value || value === "undefined" || value === "null") {
      localStorage.setItem(config.proName + '-' + name, "");
    } else {
      localStorage.setItem(config.proName + '-' + name, strToBase64(value));
    }
  }
}
function removeLocalStorage(name) {
  if (name) localStorage.removeItem(config.proName + '-' + name);
}
function clearLocalStorage() {
  localStorage.clear()
}
function getRandomStr(num) {
  const chars = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8',
    '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
    'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ]
  let res = ''
  for (let i = 0; i < num; i++) {
    let id = Math.ceil(Math.random() * 35)
    res += chars[id]
  }
  return res
}
function formatDate(date, type) {
  if (date) {
    if (date.constructor === String && date.length === 13) {
      date = new Date(parseInt(date));
    } else {
      date = new Date(date);
    }
  } else {
    date = new Date();
  }
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  let hour = date.getHours();
  hour = hour < 10 ? "0" + hour : hour;
  let minute = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  let second = date.getSeconds();
  second = second < 10 ? "0" + second : second;
  if (type == "YY-MM-DD hh:mm:ss") {
    return y + "-" + m + "-" + d + " " + hour + ":" + minute + ":" + second;
  } else if (type == "YY-MM-DD") {
    return y + "-" + m + "-" + d;
  } else if (type == "YYMMDD") {
    return y.toString() + m.toString() + d.toString();
  } else {
    return "未知格式";
  }
}
function isDomain(url) {  
  var pattern = new RegExp("^(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,6}$");  
  return pattern.test(url);  
}
export default {
  isMobile,
  strToBase64,
  base64ToStr,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  clearLocalStorage,
  getRandomStr,
  formatDate,
  isDomain
};
