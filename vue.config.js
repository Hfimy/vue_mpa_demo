const path = require('path');
const fs = require('fs');

const srcPath = path.resolve(__dirname, 'src', 'pages');
const effectiveApps = fs.readdirSync(srcPath).filter(item => fs.statSync(path.resolve(srcPath, item)).isDirectory());

const pages = Object.create(null);
const getTemplate = appName => {
  try {
    if (fs.accessSync(path.resolve(srcPath, appName, 'index.html'), fs.constants.F_OK) === undefined) {
      return path.resolve(srcPath, appName, 'index.html');
    }
    throw new Error();
  } catch (err) {
    return path.resolve(__dirname, 'public', 'index.html');
  }
};

effectiveApps.forEach(appName => {
  pages[appName] = {
    entry: path.resolve(srcPath, appName, 'main.js'),
    template: getTemplate(appName),
    // filename: `html/${appName}.index.html`
    filename: `${appName}.html`
  };
});

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  pages,
  devServer: {
    proxy: {
      '/demo-proxy': {
        target: 'https://www.target.com',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/demo-proxy': '/'
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        public: path.resolve(__dirname, 'public'),
        assets: '@/assets',
        components: '@/components',
        utils: '@/utils',
        api: '@/api'
      }
    }
  },
  runtimeCompiler: false,
  productionSourceMap: false
};
