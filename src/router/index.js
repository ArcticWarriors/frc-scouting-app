import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/pages/Dashboard';

Vue.use(Router);

function authCheck(to, from, next) {
  // RODO: Redirect to appropriate page (probably login) if not currently logged in
  next();
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      // eslint-disable-next-line
      redirect: () => {
        // TODO: Redirect to competition list if not logged in
        return 'dashboard';
      },
      
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: authCheck,
    },
  ],
});
