
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from '../src/pages/fileTransfer/fileTransfer.vue';

Vue.use(ElementUI);

// Vue.config.productionTip = false;
new Vue({
  el: '#fileTransfer',
  render: h => h(App)
});
