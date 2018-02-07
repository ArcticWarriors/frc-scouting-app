<template>
  <div id="app">
    <v-app>
      <navigation/>
      <v-content>
        <router-view/>
      </v-content>
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
