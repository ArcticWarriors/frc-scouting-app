<template>
 <v-layout row>
   <v-flex xs4>
     <v-subheader>Comments</v-subheader>
   </v-flex>
   <v-flex xs8>
     <v-text-field
       name="input-1"
       label="Label Text"
       id="testing"
       :rules="[text => !!text || 'Text is required.']"
     ></v-text-field>
   </v-flex>
 </v-layout>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>

</style>
