<template>
  <v-layout row>
    <v-flex xs4>
      <v-subheader>Did it Climb</v-subheader>
    </v-flex>
    <v-flex xs8>
      <v-radio-group v-model="row" row>
        <v-radio label="Yea" value="radio-1" color="success" />
        <v-radio label="Heck no" value="radio-2" color="error"/>
      </v-radio-group>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>

</style>
