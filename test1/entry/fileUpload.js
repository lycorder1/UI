import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from '../src/pages/fileTransfer/fileUpload.vue';

Vue.use(ElementUI);

// Vue.config.productionTip = false;
new Vue({
  el: '#fileUpload',
  render: h => h(App)
});
