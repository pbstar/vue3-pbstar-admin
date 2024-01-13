import axios from "axios";
// import qs from 'qs';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import config from "@/config";
import units from "@/units";

let baseURL = config.baseUrl || (location.protocol+'//'+location.hostname+':8091/api');
axios.defaults.timeout = config.timeOut;//设置超时时间，单位毫秒
axios.defaults.retry = 2; //设置全局请求次数
axios.defaults.retryDelay = 1000;//设置全局请求间隙

// http 响应拦截器
axios.interceptors.response.use((response) => {
  return response
}, error => {
  var config = error.config;
  if (!config || !config.retry) return Promise.reject(error);
  config.__retryCount = config.__retryCount || 0;
  if (config.__retryCount >= config.retry) {
    alert('请求异常：' + error.message + '!')
    return Promise.reject(error);
  }
  config.__retryCount++;
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, config.retryDelay || 1);
  });
  return backoff.then(function () {
    return axios(config);
  });
})

function defaultGet(url, d) {
  let data = new Object()
  if (d) data = d
  data.axiosTime = new Date().getTime()
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: data,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function get(url, d) {
  NProgress.start()
  let data = new Object()
  if (d) data = d
  data.axiosTime = new Date().getTime()
  return new Promise((resolve, reject) => {
    axios
      .get(baseURL + url, {
        params: data,
      })
      .then((response) => {
        NProgress.done()
        resolve(response.data);
      })
      .catch((err) => {
        NProgress.done()
        reject(err);
      });
  });
}
function post(url, d) {
  NProgress.start()
  let data = new Object()
  if (d) data = d
  data.token = units.getLocalStorage('token')
  return new Promise((resolve, reject) => {
    axios
      .post(baseURL + url, data)
      .then((response) => {
        NProgress.done()
        resolve(response.data);
      })
      .catch((err) => {
        NProgress.done()
        reject(err);
      });
  });
}
export default {
  defaultGet,
  get,
  post,
};
