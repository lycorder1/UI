import Vue from 'vue';
import App from '../src/pages/fileTransfer/fileList.vue';
Vue.config.productionTip = false;
new Vue({ render: h => h(App) }).$mount('#fileList'); 