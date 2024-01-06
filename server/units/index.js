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
    date = new Date(date);
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
  } else {
    return "未知格式";
  }

};
module.exports = {
  strToBase64,
  base64ToStr,
  getRandomStr,
  formatDate
};
