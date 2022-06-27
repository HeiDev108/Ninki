import { createRouter, createWebHistory } from 'vue-router';

// guards are not able to reference *this as it triggers before the component loads
// so we need to import store to allow us to check authentication values
// import store from '@/store';
import store from '@/store';

// instead of regular import, import with webpack as chunks
const Home = () => import('@/views/Home.vue');
const Song = () => import(/* webpackChunkName: "songChunk" */'@/views/Song.vue');

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'song',
    path: '/song/:id',
    component: Song,
  },
  {
    // a catch-all redirect to redirect visitors to whichever page you like.
    // Can use for 404, or any other redirect
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-blue-500',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

// check user auth and redirect them to the home page if they are not authorised
router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }
  if (store.state.auth.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;
