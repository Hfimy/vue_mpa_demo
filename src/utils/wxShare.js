import { inWeiXin } from './deviceInfo';
import { loadScript } from './loadScript';

import api from 'api/index';

// 设置微信分享
/* eslint-disable */
export function handleSetWechatShare(
  shareData,
  jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo']
) {
  if (!inWeiXin) return;
  loadScript('//res.wx.qq.com/open/js/jweixin-1.4.0.js', () => {
    handleWechatShare(shareData, jsApiList);
  });
}

function handleWechatShare(shareData, jsApiList) {
  const host = process.env.VUE_APP_MODE === 'prod' ? 'https://demo.com' : 'https://demo.con';
  const thirdPartyId = process.env.VUE_APP_MODE === 'prod' ? 1 : 2;
  const signatureUrl = encodeURIComponent(window.location.href.split('#')[0]);

  api
    .get(`${host}/demo?thirdpartyId=${thirdPartyId}&signatureUrl=${signatureUrl}`)
    .then(res => {
      const { appId, timestamp, nonceStr, signature } = res;
      wx.config({
        debug: false,
        appId,
        timestamp,
        nonceStr,
        signature,
        jsApiList
      });
      wx.ready(function() {
        //好友
        wx.onMenuShareAppMessage(shareData);

        //朋友圈
        wx.onMenuShareTimeline(shareData);

        // qq
        wx.onMenuShareQQ(shareData);

        // qq空间
        wx.onMenuShareQZone(shareData);

        // 微博
        wx.onMenuShareWeibo(shareData);
      });
      wx.error(function(res) {
        console.log(res);
      });
    })
    .catch(err => {
      console.log('设置微信分享失败:' + err);
    });
}

/* eslint-enable */
