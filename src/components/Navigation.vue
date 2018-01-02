<template>
    <v-navigation-drawer
      clipped
      fixed
      mini-variant.sync="mini"
      app
    >
      <v-list dense>
        <router-link to="dashboard" tag="NavItem" icon="dashboard" title="Dashboard"></router-link>
        <router-link to="matches" tag="NavItem" icon="" title="Matches"></router-link>
        <router-link to="rankings" tag="NavItem" icon="" title="Rankings"></router-link>
        
        <router-link to="bulk-match-scout" tag="NavItem" icon="" title="Bulk Match Scouting Entry"></router-link>
        <router-link to="bulk-team-scout" tag="NavItem" icon="" title="Bulk Team Scouting Entry"></router-link>
        <router-link to="pick-list" tag="NavItem" icon="" title="Pick List"></router-link>
        <router-link to="team-admin" tag="NavItem" icon="" title="Team Administration"></router-link>
        
        <router-link to="competitions" tag="NavItem" icon="" title="Competitions"></router-link>
        <router-link to="teams" tag="NavItem" icon="" title="All Teams"></router-link>
        
        <router-link to="site-admin" tag="NavItem" icon="" title="Site Administration"></router-link>
        <router-link to="login" tag="NavItem" icon="" title="Login"></router-link>
        <router-link to="account" tag="NavItem" icon="" title="Account"></router-link>
        <router-link to="logout" tag="NavItem" icon="" title="Logout"></router-link>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="mini = !mini"></v-toolbar-side-icon>
      <v-toolbar-title>FRC Scouting</v-toolbar-title>
    </v-toolbar>
</template>

<script>
  import NavItem from '@/components/NavItem';
  export default {
    data: () => ({
      mini: null
    }),
    components: {
      NavItem,
    },
  }
</script>