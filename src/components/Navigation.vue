<template>
  <div>
    <v-navigation-drawer
      clipped
      fixed
      :mini-variant="mini"
      app
    >
      <v-list dense>
        <v-list-tile v-for="navItem of navItems" :to="navItem.to" :key="navItem.title" router>
          <v-list-tile-action>
            <v-icon>{{ navItem.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ navItem.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="mini = !mini"/>
      <v-toolbar-title>FRC Scouting</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    data: () => ({
      mini: false,
      navItems: [
        { to: 'dashboard', icon: 'dashboard', title: 'Dashboard' },
        { to: 'matches', icon: '', title: 'Matches' },
        { to: 'rankings', icon: '', title: 'Rankings' },
        
        { to: 'bulk-match-scout', icon: '', title: 'Bulk Match Scouting Entry' },
        { to: 'bulk-team-scout', icon: '', title: 'Bulk Team Scouting Entry' },
        { to: 'pick-list', icon: '', title: 'Pick List' },
        { to: 'team-admin', icon: '', title: 'Team Administration' },
        
        { to: 'competitions', icon: '', title: 'Competitions' },
        { to: 'teams', icon: '', title: 'All Teams' },
        
        { to: 'site-admin', icon: '', title: 'Site Administration' },
        { to: 'login', icon: '', title: 'Login' },
        { to: 'account', icon: '', title: 'Account' },
        { to: 'logout', icon: '', title: 'Logout' },
      ],
    }),
  };
</script>
