<template>
  <div id="app">
    <v-app>
      <navigation/>
      <v-content>
        <router-view/>
      </v-content>
      
    <!--v-bottom-nav absolute :value="true" :active.sync="e1" color="transparent">
      <v-btn flat color="teal" value="recent">
        <span>Recent</span>
        <v-icon>history</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="favorites">
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="nearby">
        <span>Nearby</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav-->

    </v-app>
  </div>
</template>

<script>
import Navigation from '@/components/nav/Navigation';

export default {
  name: 'App',
  components: {
    Navigation,
  },
  data() {
    return { e1: 'recent' };
  },
  
  
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}
</style>
