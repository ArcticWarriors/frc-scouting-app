import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/pages/Dashboard';
import Competitions from '@/pages/Competitions';
import Matches from '@/pages/Matches';
import Rankings from '@/pages/Rankings';
import BulkScout from '@/pages/BulkScout';
import PickList from '@/pages/PickList';
import TeamAdmin from '@/pages/TeamAdmin';
import AllTeams from '@/pages/AllTeams';

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
    {
      path: '/competitions',
      name: 'Competitions',
      component: Competitions,
    },
    {
      path: '/matches',
      name: 'Matches',
      component: Matches,
    },
    {
      path: '/rankings',
      name: 'Rankings',
      component: Rankings,
    },
    {
      path: '/bulk-scout',
      name: 'Bulk Scouting Entry',
      component: BulkScout,
    },
    {
      path: '/pick-list',
      name: 'Pick List',
      component: PickList,
    },
    {
      path: '/team-admin',
      name: 'Team Administration',
      component: TeamAdmin,
    },
    {
      path: '/all-teams',
      name: 'All Teams',
      component: AllTeams,
    },
  ],
});
