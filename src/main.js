import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import VueGtag from 'vue-gtag';
import FineMq from 'fine-mq';

Vue.config.productionTip = false;
Vue.component('v-select', vSelect);

// Google Analytics
Vue.use(
   VueGtag,
   {
      config: { id: 'UA-105987352-6' },
   },
   router
);

// Media Queries
Vue.use(FineMq, {
   aliases: {
      mobile: [0, 680],
      tablet: [681, 1024],
      laptop: [1025, 1249],
      desktop: [1250],
      landscape: '(orientation: landscape)',
      portrait: '(orientation: portrait)',
   },
});

new Vue({
   router,
   render: (h) => h(App),
}).$mount('#app');
