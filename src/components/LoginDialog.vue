<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="value"
      max-width="500px"
      @input="val => $emit('input', val)"
    >
      <v-card>
        <v-card-title>Login</v-card-title>
        <v-alert :value="error" type="error">
          {{ error }}
        </v-alert>
        <v-card-text>
          <v-text-field
            :rules="emailRules"
            v-model="email"
            label="Email address"
            hint="Enter your email!"
            type="email"
            persistent-hint
          />
          <v-text-field
            v-model="password"
            :append-icon="passwordVisible ? 'visibility_off' : 'visibility'"
            :append-icon-cb="() => (passwordVisible = !passwordVisible)"
            :type="passwordVisible ? 'text' : 'password'"
            name="input-10-1"
            label="Enter your password"
            hint="At least 8 characters"
            min="8"
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
        console.log(data);
        localStorage.setItem('authToken', data.data.login.token);
        this.email = '';
        this.password = '';
        this.error = '';
        this.$emit('input', false);
      }).catch((error) => {
        [, this.error] = error.message.match(/^(?:GraphQL error:)?(.+)/);
      });
    },
  },
};
</script>
