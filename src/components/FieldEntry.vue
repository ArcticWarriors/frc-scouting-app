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
        <td><v-btn @click="$emit('deleter', {modification: 'delete',name:props.item.name, type:props.item.type})"><i class="material-icons">delete</i></v-btn></td>
      </template>
    </v-data-table>
    <v-layout row wrap>
      <v-flex xs2 sm5>
        <v-text-field
          label="Field Name"
          :rules="[text => !!text || 'Text is required.']"
          v-model="name"
        />
      </v-flex>
      <v-flex xs2 sm3>
        <v-select         
          :items="['Number', 'Text','Boolean']" 
          label="Field Type" 
          :rules="[text => !!text || 'Text is required.']"
          v-model="type"
        />
      </v-flex>
      <v-flex xs2 sm4>
        <v-btn @click="$emit('add', {name, type, modification: 'add'})">Submit</v-btn>
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
        name: '',
        type: '',
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
