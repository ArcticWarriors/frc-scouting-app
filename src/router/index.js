import Vue from 'vue';
import Router from 'vue-router';
import TeamAdmin from '@/pages/TeamAdmin';
import AllTeams from '@/pages/AllTeams';
import Dashboard from '@/pages/Dashboard';

Vue.use(Router);

function authCheck(to, from, next) {
  // RODO: Redirect to appropriate page (probably login) if not currently logged in
  next();
}

export default new Router({
  routes: [
  
    // Hello World
    {
      path: '/',
      name: 'index',
      // eslint-disable-next-line
      redirect: () => {
        // TODO: Redirect to competition list if not logged in
        return 'helloworld';
      },
      
    },
    {
      path: '/team-admin',
      name: 'team-admin',
      component: TeamAdmin,
      beforeEnter: authCheck,
    },

    // AllTeams
    {
      path: '/',
      name: 'index',
      // eslint-disable-next-line
      redirect: () => {
        // TODO: Redirect to competition list if not logged in
        return 'allteams';
      },
      
    },
    {
      path: '/allteams',
      name: 'allteams',
      component: AllTeams,
      beforeEnter: authCheck,
    },

    // Dashboard
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
