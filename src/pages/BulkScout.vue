<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" scrollable max-width="600px">
      <v-btn color="primary" dark slot="activator">174</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Team 174 - Match 7</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
			<v-container fluid>
        <FieldBoolean/>
        <FieldText/>
        <FieldNumber/>
		  </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import FieldText from '@/components/fieldTypes/text';
import FieldNumber from '@/components/fieldTypes/number';
import FieldBoolean from '@/components/fieldTypes/boolean';

export default {
  name: 'BulkScout',
    data () {
      return {
        dialogm1: '',
        dialog: false,
      }
    },
  components: {
    FieldText, FieldNumber, FieldBoolean
  }
};
</script>

<style scoped>

</style>
