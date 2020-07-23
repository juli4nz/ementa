import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home.vue';
import NotFound from '@/components/404.vue';
import Ementa from '@/components/Ementa.vue';
import EmentaTopics from '@/components/EmentaTopics.vue';
import EmentaDetail from '@/components/EmentaDetail.vue';
import EmentaCatalog from '@/components/EmentaCatalog.vue';
import EmentaChef from '@/components/EmentaChef.vue';

Vue.use(VueRouter);

const routes = [
   {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: () => {
         window.location.href = 'https://ementa.info';
      },
   },
   {
      path: '*',
      name: 'not_found',
      component: NotFound,
   },
   {
      path: '/ementa/:id(\\d+)/:slug',
      component: Ementa,
      children: [
         // Ementa
         {
            path: '/',
            name: 'ementa',
            component: EmentaTopics,
         },
         // Categories
         {
            path: ':a_slug',
            name: 'ementa_a',
            component: EmentaTopics,
         },
         {
            path: ':a_slug/:b_slug',
            name: 'ementa_b',
            component: EmentaTopics,
         },
         {
            path: ':a_slug/:b_slug/:c_slug',
            name: 'ementa_c',
            component: EmentaTopics,
         },
         // Details
         {
            path: ':a_slug/detail',
            name: 'ementa_a_detail',
            component: EmentaDetail,
         },
         {
            path: ':a_slug/:b_slug/detail',
            name: 'ementa_b_detail',
            component: EmentaDetail,
         },
         {
            path: ':a_slug/:b_slug/:c_slug/detail',
            name: 'ementa_c_detail',
            component: EmentaDetail,
         },
         // Chef
         {
            path: 'chef_suggestions',
            name: 'chef',
            component: EmentaChef,
         },
         // Catalog
         {
            path: ':a_slug/catalog',
            name: 'ementa_a_catalog',
            component: EmentaCatalog,
         },
         {
            path: ':a_slug/:b_slug/catalog',
            name: 'ementa_b_catalog',
            component: EmentaCatalog,
         },
         {
            path: ':a_slug/:b_slug/:c_slug/catalog',
            name: 'ementa_c_catalog',
            component: EmentaCatalog,
         },
      ],
   },
];

const router = new VueRouter({
   routes,
   mode: 'history',
});

router.beforeEach((to, from, next) => {
   window.scrollTo(0, 0);
   next();
});

export default router;
