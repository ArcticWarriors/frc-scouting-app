<template>
  <v-layout row justify-center>
    <v-dialog
      max-width="500px"
      v-model="value"
      @input="val => $emit('input', val)"
    >
      <v-card>
        <v-card-title>Login</v-card-title>
        <v-alert type="error" :value="error">
          {{ error }}
        </v-alert>
        <v-card-text>
          <v-text-field
            label="Email address"
            :rules="emailRules"
            v-model="email"
            hint="Enter your email!"
            type="email"
            persistent-hint
          />
          <v-text-field
            name="input-10-1"
            label="Enter your password"
            hint="At least 8 characters"
            v-model="password"
            min="8"
            :append-icon="passwordVisible ? 'visibility_off' : 'visibility'"
            :append-icon-cb="() => (passwordVisible = !passwordVisible)"
            :type="passwordVisible ? 'text' : 'password'"
            counter
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" dark @click="login()">Login</v-btn>
          <v-btn color="primary" flat @click.stop="$emit('input', false)">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
import gql from 'graphql-tag';

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    email: '',
    password: '',
    error: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
    ],
    passwordVisible: false,
  }),
  methods: {
    login() {
      this.$apollo.mutate({
        mutation: gql`
            mutation($email: String!, $password: String!) {
              login(email: $email, password: $password) {
                token
             }
          }
       `,
        variables: {
          email: this.email,
          password: this.password,
        },
      }).then((data) => {
        localStorage.setItem('authToken', data.data.login.token);
        this.$emit('input', false);
      }).catch((error) => {
        this.error = error.message.match(/^(?:GraphQL error:)?(.+)/)[1];
      });
    },
  },
};
</script>
