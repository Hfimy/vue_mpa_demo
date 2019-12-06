import axios from 'axios';

const checkStatus = response => {
  if (response.status >= 200 && response.status < 400) {
    return response.data;
  }
  throw new Error();
};

/* eslint-disable no-unused-vars */
const formatError = error => {
  return {
    ret: -999, // 前端自定义错误码-ret,如需详细显示错误信息可进一步扩展
    msg: '神秘力量正在干扰'
  };
};
/* eslint-enable */

export default {
  get(url, params = {}, withCredentials = false, config = {}) {
    return axios({
      method: 'get',
      url,
      params,
      withCredentials,
      ...config
    })
      .then(checkStatus)
      .catch(formatError);
  },
  post(url, data = {}, withCredentials = false, config = {}) {
    return axios({
      method: 'post',
      url,
      data,
      withCredentials,
      ...config
    })
      .then(checkStatus)
      .catch(formatError);
  }
};
