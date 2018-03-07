<template>
  <div>
    <h2>Team Fields</h2>
    <field-entry :items="teamFields" @add="submitTF" @deleter="deleteTF"/>
  </div>
</template>

<script>
import FieldEntry from '@/components/FieldEntry';

export default {
  name: 'TeamAdmin',
  components: { FieldEntry },
  data() {
    return {
    	teamFields: [],
    	matchFields: [],
    };
  },
  methods: {
    submitTF(field) { 
      if (field.name != '' && field.type != '') {
        this.teamFields.push({ 
          name: field.name, 
          type: field.type,
        }); 
      }
    },
    deleteTF(field) { 
      this.teamFields = this.teamFields.filter(f => f.name != field.name);
    },    
  },
};
</script>

<style scoped>

</style>
