<template>
  <div>
	<h2>Bulk Scouting Entry</h2>
    <v-data-table :headers="fieldHeaders" :items="fieldItems">
      <template slot="items" slot-scope="props">
         <td class="text-xs-left">          
            <v-text-field xs1 type="number" slot="input" label="Edit" v-model="props.item.name" single-line counter/> 
        </td>
         <td class="text-xs-left">
          <v-text-field xs1 slot="input" label="Edit"  type="number" v-model="props.item.match" single-line counter/>
        </td>
         <td class="text-xs-left">
          <v-select xs1 :items="['True','False']" label="Boolean" v-model="props.item.boolean"/>
        </td>
         <td class="text-xs-left">
            <v-text-field xs1 slot="input" label="Edit" v-model="props.item.points" single-line counter/>          
        </td>
         <td class="text-xs-left">
            <v-text-field slot="input" label="Edit" v-model="props.item.text" single-line :counter="250"/>
        </td>
      </template>
    </v-data-table>
    <v-btn color="primary" @click.native="newFieldRow">New Row</v-btn>
      <h2>Pit Scouting Entry</h2>
    <v-data-table :headers="pitHeaders" :items="pitItems">
      <template slot="items" slot-scope="props">
         <td class="text-xs-left">          
            <v-text-field xs1 type="number" slot="input" label="Edit" v-model="props.item.name" single-line counter/>
        </td>
         <td class="text-xs-left">
          <v-select xs1 :items="[1,2,3,4,5,6,7,8,9,10]" label="Enthusiasm" v-model="props.item.enthusiasm"/>
        </td>
         <td class="text-xs-left">
            <v-text-field xs1 slot="input" label="Edit" v-model="props.item.points" single-line counter/>          
        </td>
         <td class="text-xs-left">
            <v-text-field slot="input" label="Edit" v-model="props.item.text" single-line :counter="250"/>
        </td>
      </template>
    </v-data-table>
    <v-btn color="primary" @click.native="newPitRow">New Row</v-btn>
  </div>
</template>

<script>
  export default {
    data: () => ({
      fieldHeaders: [],
      pitHeaders: [],
      fieldItems: [],
      pitItems: [],
      defaultFieldItem: {
        name: 0,
        match: 0,
        points: 1234,
        boolean: '',
        text: 'none',
      },

      defaultPitItem: {
        name: 0,
        points: 0,
        enthusiasm: 9,
        text: 'none',
      }
    }),
    components:
      {},


    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.fieldHeaders = [
        {
          text: 'Teams',
          align: 'center',
          sortable: false,
          value: 'name'
        },
        { text: 'Match #', value: 'match' },
        { text: 'Boolean', value: 'boolean' },
        { text: 'Points', value: 'points' },
        { text: 'Text example', value: 'text' },
        ]

        this.fieldItems = [
        { name: 174, match: 14, boolean: true, points: 16, text: 'sub B'},
        { name: 175, match: 14, boolean: false, points: 0, text: 'get good'}
        ]

        this.pitHeaders = [
        {
          text: 'Teams',
          align: 'center',
          sortable: false,
          value: 'name'
        },
        { text: 'Enthusiasm', value: 'enthusiasm' },
        { text: 'Points', value: 'points' },
        { text: 'Text example', value: 'text' },
        ]

        this.pitItems = [
        { name: 174, enthusiasm: 10, points: 16, text: 'sub B'},
        { name: 175, enthusiasm: 1, points: 0, text: 'get good'}
        ]
      },

      newFieldRow () {
        this.fieldItems.push(this.defaultFieldItem)
      },

      newPitRow () {
        this.pitItems.push(this.defaultPitItem)
      }
    }
  }
</script>

<style scoped>

</style>
