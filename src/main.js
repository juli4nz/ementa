import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import VueGtag from 'vue-gtag';

Vue.config.productionTip = false;
Vue.component('v-select', vSelect);

Vue.use(
   VueGtag,
   {
      config: { id: 'UA-105987352-6' },
   },
   router
);

new Vue({
   router,
   render: (h) => h(App),
}).$mount('#app');
