import Vue from 'vue';
import VueRouter from 'vue-router';
import '../firebase';
import routes from './routes';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  // Navigation Guard
  Router.beforeEach((to, from, next) => {
    // If trying to go to login, always allow
    if (to.path === '/login') {
      next();
      return;
    }

    // Otherwise, wait for the firebase auth to init
    Vue.prototype.$firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // If user logged in, go to requested route

        next();
      } else {
        // Otherwise, go to login
        Router.push('/login');
      }
    });
  });

  return Router;
}
