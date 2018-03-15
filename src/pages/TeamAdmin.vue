<template>
  <div>
    <h2>Team Fields</h2>
    <field-entry :items="teamFields" @add="submitTF" @deleter="deleteTF"/>
    <h2>Match Fields</h2>
    <field-entry :items="matchFields" @add="submitMF" @deleter="deleteMF"/>
    <teamData team="123"/>
  </div>
</template>

<script>
import FieldEntry from '@/components/FieldEntry';
import teamData from '@/components/teamData';

export default {
  name: 'TeamAdmin',
  components: { FieldEntry, teamData},
  data() {
    return {
    	teamFields: [
                  {
            name: 'Frozen Yogurt',
            type: 'Boolean',
          },
                  {
            name: 'Bloo',
            type: 'Number',
          }          
      ],
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
    deleteTF(field) { 
      this.teamFields = this.teamFields.filter(f => f.name != field.name);
    },    
    deleteMF(field) { 
      this.matchFields = this.matchFields.filter(f => f.name != field.name);
    },
  },
};
</script>

<style scoped>

</style>
