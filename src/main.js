// import font-awesome
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fa-xmark, fa-comments } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidatePlugin from './includes/validation';
import { auth } from './includes/firebase';
import Icon from './directives/icon';
import './assets/tailwind.css';
import './assets/main.css';
import './registerServiceWorker';
import ProgressBar from './includes/progress-bar';

// import nprogress css
import 'nprogress/nprogress.css';

// make router accessible for ProgressBar
ProgressBar(router);

let app;

// initialise firebase before the main app, to allow us to start auth before we load app
auth.onAuthStateChanged(() => {
  // initialise app now that firebase auth is loaded
  if (!app) {
    app = createApp(App);
    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);
    app.directive('icon', Icon);

    // library.add(fa-xmark, fa-comments);

    // app.component('font-awesome-icon', FontAwesomeIcon);
    // app.config.productionTip = false;

    app.mount('#app');
  }
});
