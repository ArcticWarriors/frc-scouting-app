// Vue
import Vue from 'vue';
// Vuetify
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
// Apollo
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
// Our app
import App from './App';
import router from './router';

Vue.config.productionTip = false;

// Apollo setup
const httpLink = new HttpLink({
  // Update this to be filled out dynamically via NODE_ENV and/or environment vars
  uri: API_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authToken');
  console.log(token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// Install vue plugins
Vue.use(VueApollo);
Vue.use(Vuetify);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  render: h => h(App),
});
