// 加载脚本
export function loadScript(url, cb) {
  const head = document.querySelector('head');
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onreadystatechange = function() {
    if (this.readyState === 'loaded' || this.readyState === 'complete') {
      cb && cb();
    }
  };
  script.onload = () => {
    cb && cb();
  };
  head.appendChild(script);
}
