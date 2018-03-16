<template>
  <v-layout row>
    <v-flex xs4>
      <v-subheader>{{ comments }}</v-subheader>
    </v-flex>
    <v-flex xs8>
      <v-text-field
      name="input-1"
      label="Label Text"
      :rules="[(v) => v.length <= 250 || 'Max 250 characters']"
      :counter="250"                
      textarea
      id="testing"
    ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {};
  },
    props: {
    comments: {
      type: String,
      default: '',
    },
  }
};
</script>

<style scoped>

</style>
