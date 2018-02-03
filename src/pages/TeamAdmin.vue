<template>
  <div>
    <h2>Team Fields</h2>
    <field-entry :items="teamFields" @input="submitTF($event)"/>
    <h2>Match Fields</h2>
    <field-entry :items="matchFields" @input="submitMF($event)"/>
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
    submitMF(field) { 
      if (field.name != '' && field.type != '') {
        this.matchFields.push({ 
          name: field.name, 
          type: field.type,
        }); 
      }
    },
  },
};
</script>

<style scoped>

</style>
