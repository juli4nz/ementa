import Vue from 'vue';
import VueRouter from 'vue-router';
import Ementa from '@/components/Ementa.vue';
import TopicDetail from '@/components/TopicDetail.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    //component: Home,
  },
  {
    path: '/ementa/:id(\\d+)/:slug',
    name: 'ementa',
    component: Ementa,
  },
  {
    path: '/ementa/:id(\\d+)/:slug/:topic_id',
    name: 'detail',
    component: TopicDetail,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
