<template>
  <div>
    <h2>Team Fields</h2>
    <field-entry :items="teamFields" @add="submitTF" @deleter="deleteTF"/>
    <Team3724Data team="2324"/>
    <teamData team="123"/>
  </div>
</template>

<script>
import FieldEntry from '@/components/FieldEntry';
import teamData from '@/components/teamData';
import Team3724Data from '@/components/Team3724Data';

export default {
  name: 'TeamAdmin',
  components: { FieldEntry, teamData, Team3724Data},
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
    deleteTF(field) { 
      this.teamFields = this.teamFields.filter(f => f.name != field.name);
    },    
  },
};
</script>

<style scoped>

</style>
