<template>
  <v-layout row>
    <v-flex xs4>
      <v-subheader>Did it Climb</v-subheader>
    </v-flex>
          <v-flex xs4>
            <v-select :items="['True','False']" label="Boolean" 
          :rules="[text => !!text || 'Text is required.']" v-model="row"></v-select>
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
