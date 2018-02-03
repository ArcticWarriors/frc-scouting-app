<template>
  <div>
    <p>{{ fullName }}</p>
    <v-form v-model="valid">
      <v-text-field
        label="firstName"
        v-model="firstName"
        :rules="nameRules"
        :counter="10"
      />
      <v-text-field
        label="lastName"
        v-model="lastName"
        :rules="emailRules"
      />
    </v-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        alid: false,
        firstName: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        lastName: '',
        emailRules: [
          v => !!v || 'E-mail is required',
        ],
      };
    },
    computed: {
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
  };
</script>

<style scoped>

</style>
