<template>
  <div>
    <v-navigation-drawer v-if="authenticated || $route.params.competition"
                         :mini-variant.sync="mini"
                         clipped
                         fixed
                         stateless
                         permanent
                         app
    >
      <v-list dense>
        <nav-item v-if="authenticated" to="dashboard" icon="dashboard" title="Dashboard"/>
        <nav-item to="matches" icon="poll" title="Matches" disabled/>
        <nav-item to="rankings" icon="fa-trophy" title="Rankings"/>
        <nav-item v-if="hasRole(['DATA_ENTRY', 'SCOUTMASTER'])" to="bulk-scout"
                  icon="fa-list" title="Bulk Scouting Entry"/>
        <nav-item v-if="hasRole(['DRIVE_TEAM', 'ANALYST', 'SCOUTMASTER'])" to="pick-list"
                  icon="fa-tasks" title="Pick List" disabled/>
        <nav-item v-if="hasRole(['SCOUTMASTER'])" to="team-admin"
                  icon="fa-cogs" title="Team Administration"/>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dense fixed clipped-left>
      <v-toolbar-side-icon @click.stop="mini = !mini"/>
      <v-toolbar-title>FRC Scouting</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <nav-button to="competitions" icon="event" title="Competitions" disabled/>
        <nav-button to="all-teams" icon="people" title="Teams" disabled/>
        <nav-button v-if="!authenticated"
                    icon="fa-sign-in-alt"
                    title="Login"
                    @click="showLogin=true"/>
        <v-menu v-else offset-y>
          <nav-button icon="account_circle" :title="me.name" slot="activator"/>
          <v-list>
            <v-list-tile disabled>
              <v-list-tile-title>Settings</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="logout()">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <login-dialog v-model="showLogin" @input="$apollo.queries.me.refetch()"/>
  </div> 
</template>
<script>
  import gql from 'graphql-tag';
  import LoginDialog from '@/components/LoginDialog';
  import NavItem from './NavItem';
  import NavButton from './NavButton';
  
  export default {
    components: {
      NavItem,
      NavButton,
      LoginDialog,
    },
    data: () => ({
      mini: false,
      admin: false,
      showLogin: false,
    }),
    apollo: {
      me: gql`{
            me {
              roles
              name
            }
          }`,
    },
    computed: {
      authenticated() { return !!this.me; },
      roles() { return this.me.roles || []; },
    },
    methods: {
      logout() {
        localStorage.removeItem('authToken');
        location.reload();
      },
      hasRole(roles) {
        if (!this.authenticated) return false;
        return this.me.roles.some(role => roles.includes(role));
      },
    },
  };
</script>
