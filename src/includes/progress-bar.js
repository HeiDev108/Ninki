import NProgress from 'nprogress';

// pass in router - main.js imports router into this file for access
export default (router) => {
  // use router guards to add progress bars for each loading page chunk
  router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
  });

  router.afterEach(NProgress.done);
};
