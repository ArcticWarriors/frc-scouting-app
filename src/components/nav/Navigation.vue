<template>
  <div>
    <v-navigation-drawer
      clipped
      fixed
      :mini-variant.sync="mini"
      stateless
      permanent
      app
    >
      <v-list dense>
        <nav-item to="dashboard" icon="dashboard" title="Dashboard"/>
        <nav-item to="matches" icon="poll" title="Matches"/>
        <nav-item to="rankings" icon="fa-trophy" title="Rankings"/>
        <nav-item to="bulk-scout" icon="fa-list" title="Bulk Scouting Entry"/>
        <nav-item to="pick-list" icon="fa-tasks" title="Pick List"/>
        <nav-item to="team-admin" icon="fa-cogs" title="Team Administration"/>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dense fixed clipped-left>
      <v-toolbar-side-icon @click.stop="mini = !mini"/>
      <v-toolbar-title>FRC Scouting</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items class="hidden-lg">
        <nav-button to="competitions" icon="event" small-button class = "hidden-sm-and-up"/>
        <nav-button to="competitions" icon="event" title = "Competitions" class = "hidden-xs-only"/>
        <nav-button to="all-teams" icon="people" small-button class = "hidden-sm-and-up"/>
        <nav-button to="all-teams" icon="people" title = "Teams" class = "hidden-xs-only"/>
        <nav-button 
          v-if="!authenticated" icon="fa-sign-in-alt" small-button 
          class = "hidden-sm-and-up"/>
        <nav-button 
          v-if="!authenticated" icon="fa-sign-in-alt" title="Login" 
          class="hidden-xs-only"/>
        <nav-button v-else icon="account_circle" title="Account"/>
      </v-toolbar-items>
    </v-toolbar>
  </div> 
</template>
<script>
  import NavItem from './NavItem';
  import NavButton from './NavButton';
  
  export default {
    components: {
      NavItem,
      NavButton,
    },
    data: () => ({
      mini: false,
      authenticated: false,
      admin: false,
    }),
  };
</script>
