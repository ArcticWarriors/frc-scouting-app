// Vue
import Vue from 'vue';
// Vuetify
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
// Apollo
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
// Our app
import App from './App';
import router from './router';

Vue.config.productionTip = false;

// Apollo setup
const httpLink = new HttpLink({
  // Update this to be filled out dynamically via NODE_ENV and/or environment vars
  uri: 'http://localhost:4000/frcsa-api/dev',
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// Install vue plugins
Vue.use(VueApollo);
Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
