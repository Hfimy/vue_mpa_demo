import Vue from 'vue';
import { Toast } from 'vant';

import App from './App';

Vue.config.productionTip = false;

Vue.use(Toast);

new Vue({
  render: h => h(App)
}).$mount('#app');
