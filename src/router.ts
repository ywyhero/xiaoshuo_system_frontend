import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/login.vue';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: '/system/',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    }, {
      path: '/system',
      name: 'sysIndex',
      component: () => import('./views/index.vue'),
      children: [
        {
          path: 'index',
          component: () => import('./views/sysIndex.vue'),
        }, {
          path: 'upload',
          component: () => import('./views/upload/upload.vue'),
        }, {
          path: 'uploadTxt',
          component: () => import('./views/upload/uploadTxt.vue'),
        }, {
          path: 'lists',
          component: () => import('./views/booklists.vue'),
        }, {
          path: 'chapters',
          component: () => import('./views/chapters.vue'),
        }, {
          path: 'detail',
          component: () => import('./views/bookdetail.vue'),
        }, {
          path: 'storyLog',
          component: () => import('./views/storyLog.vue'),
        }, {
          path: 'options',
          component: () => import('./views/options.vue'),
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    router.replace('/login');
  }
  if (to.path === '/system/system') {
    router.replace('/system/index');
  }
  next();
});
export default router;
