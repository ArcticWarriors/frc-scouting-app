import Vue from 'vue';
import Router from 'vue-router';

import gql from 'graphql-tag';

import Dashboard from '@/pages/Dashboard';
import Competitions from '@/pages/Competitions';
import Matches from '@/pages/Matches';
import Rankings from '@/pages/Rankings';
import BulkScout from '@/pages/BulkScout';
import PickList from '@/pages/PickList';
import TeamAdmin from '@/pages/TeamAdmin';
import AllTeams from '@/pages/AllTeams';
import Login from '@/pages/Login';

Vue.use(Router);

async function authCheck(to, from, next) {
  const userCheck = !to.meta.auth ? () => true :
                                    user => user.roles.some(role => to.meta.auth.includes(role));
  
  const res = await new Promise((resolve) => {
    // We have to use setTimeout because otherwise apollo won't be set up yet
    console.log(this);
    setTimeout(() => resolve(this.a.app.$apollo.query({
      query: gql`{
            me {
              roles
              name
            }
          }`,
      fetchPolicy: 'network-only',
    })));
  });
  console.log(res);
  if (res.data.me && userCheck(res.data.me)) next();
  else next({ name: 'Login', query: { redir: to.fullPath } });
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
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: authCheck.bind(this),
    },
    {
      path: '/all-teams',
      name: 'All Teams',
      component: AllTeams,
    },
    {
      path: '/competitions',
      name: 'Competitions',
      component: Competitions,
    },
    {
      path: '/competitions/:regional_code/matches/',
      name: 'Matches',
      component: Matches,
    },
    {
      path: '/competitions/:regional_code/rankings',
      name: 'Rankings',
      component: Rankings,
    },
    {
      path: '/bulk-scout',
      name: 'Bulk Scouting Entry',
      component: BulkScout,
      beforeEnter: authCheck.bind(this),
      meta: { auth: ['SCOUTMASTER', 'DATA_ENTRY'] },
    },
    {
      path: '/pick-list',
      name: 'Pick List',
      component: PickList,
      beforeEnter: authCheck.bind(this),
      meta: { auth: ['DRIVE_TEAM', 'ANALYST', 'SCOUTMASTER'] },
    },
    {
      path: '/team-admin',
      name: 'Team Administration',
      component: TeamAdmin,
      beforeEnter: authCheck.bind(this),
      meta: { auth: ['SCOUTMASTER'] },
    },
  ],
});
