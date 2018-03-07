<template>
  <v-dialog v-model="dialog3724" scrollable max-width="600px">
    <v-btn color="primary" dark slot="activator">Team {{ team }}</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Team {{ team }} Matches</span>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-container fluid>
          <teamData team="123" match= "1"/>
          <teamData team="456" match= "2"/>
          <teamData team="789" match= "3"/>
          <teamData team="1010" match= "4"/>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="blue darken-1" flat @click.native="dialog3724 = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="dialog3724 = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import teamData from '@/components/teamData';

export default {
  name: 'BulkScout',
  data() {
    return {
      dialogm1: '',
      dialog3724: false,
    };
  },
  components: {
    teamData,
  },
  props: {
    team: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>

</style>
