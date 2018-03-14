<template>
  <v-dialog v-model="dialog174" scrollable max-width="600px">
    <v-btn color="primary" dark slot="activator">Field Data Form</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Team {{ team }} - Matches</span>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-container fluid>
          <FieldBoolean/>
          <FieldText comments= 'props.item.name'/>
          <FieldText comments="get good"/>
          <FieldNumber/>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="blue darken-1" flat @click.native="dialog174 = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="dialog174 = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FieldEntry from '@/components/FieldEntry';

import FieldText from '@/components/fieldTypes/text';
import FieldNumber from '@/components/fieldTypes/number';
import FieldBoolean from '@/components/fieldTypes/boolean';

export default {
  name: 'BulkScout',
  data() {
    return {
      dialogm1: '',
      dialog174: false,
    };
  },
  components: {
    FieldText, FieldNumber, FieldBoolean,
  },
  props: {
    team: {
      type: String,
      default: '',
    }
  },
};
</script>

<style scoped>

</style>
