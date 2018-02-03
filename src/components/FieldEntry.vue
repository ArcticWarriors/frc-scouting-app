<template>
  <v-container fluid grid-list-md>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.type }}</td>
        <td><v-btn @click="$delete()"><i class="material-icons">delete</i></v-btn></td>
      </template>
    </v-data-table>
    <v-layout row wrap>
      <v-flex xs2 sm5>
        <v-text-field
          label="Field Name"
          :rules="[text => !!text || 'Text is required.']"
          v-model="fieldName"
        />
      </v-flex>
      <v-flex xs2 sm3>
        <v-select         
          :items="['Number', 'Text','Boolean']" 
          label="Field Type" 
          :rules="[text => !!text || 'Text is required.']"
          v-model="fieldType"
        />
      </v-flex>
      <v-flex xs2 sm4>
        <v-btn @click="$emit('input', {name: fieldName, type: fieldType})">Submit</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {
        fieldName: '',
        fieldType: '',
        headers: [
            { text: 'Field Name', align: 'center', sortable: false, value: 'name' },
            { text: 'Type', align: 'center', value: 'dropdown' },
        ],
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
