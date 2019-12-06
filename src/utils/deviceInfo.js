// userAgent
export const ua = window.navigator.userAgent.toLowerCase();

// 判断微信环境
export const inWeiXin = (function() {
  return /MicroMessenger/i.test(ua);
})();
