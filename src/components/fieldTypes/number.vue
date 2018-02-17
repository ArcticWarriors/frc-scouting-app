<template>
 <v-layout row>
   <v-flex xs4>
     <v-subheader>Switch Scores</v-subheader>
   </v-flex>
   <v-flex xs8>
     <v-text-field
       v-if="type === 'number'" type="number" label="Number" v-model="number"
       name="input-1"
       id="testing"
       :rules="[number => !!number || 'Number is required.']"
     ></v-text-field>
   </v-flex>
 </v-layout>
</template>
<script>
export default {
  data() {
    return {
    	type: 'number',
        number: 0,
    };
  }
};
</script>

<style scoped>

</style>
