<template>
  <div>
	<v-card-title>
      Bulk Scouting Entry
      <v-spacer></v-spacer>
    <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
    ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
    >
      <template slot="items" slot-scope="props">
         <td class="text-xs-left">
          <v-edit-dialog
          :return-value.sync="props.item.name"
          lazy
          > {{ props.item.name }}
            <v-text-field
              slot="input"
              label="Edit"
              v-model="props.item.name"
              single-line
              counter
            ></v-text-field>
          </v-edit-dialog>
        </td>

         <td class="text-xs-left">
          <v-edit-dialog
          :return-value.sync="props.item.match"
          lazy
          > {{ props.item.match }}
            <v-text-field
              slot="input"
              label="Edit"
              v-model="props.item.match"
              single-line
              counter
            ></v-text-field>
          </v-edit-dialog>
        </td>

         <td class="text-xs-left">
            <v-select :items="['True','False']" label="Boolean" 
                      v-model="props.item.boolean"></v-select>
        </td>

         <td class="text-xs-left">
          <v-edit-dialog
          :return-value.sync="props.item.points"
          lazy
          > {{ props.item.points }}
            <v-text-field
              slot="input"
              label="Edit"
              v-model="props.item.points"
              single-line
              counter
            ></v-text-field>
          </v-edit-dialog>
        </td>

         <td class="text-xs-left">
          <v-edit-dialog
          :return-value.sync="props.item.text"
          lazy
          > {{ props.item.text }}
            <v-text-field
              slot="input"
              label="Edit"
              v-model="props.item.text"
              single-line
              :counter="250"                
              textarea              
            ></v-text-field>
          </v-edit-dialog>
        </td>
      </template>
      <template slot="expand" slot-scope="props">
      	<v-card flat>
        	<v-card-text>Team Details</v-card-text>
      	</v-card>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
    <v-btn color="primary" @click.native="newRow">New Row</v-btn>
  </div>
</template>

<script>


  export default {
    data: () => ({
      search: '',
      headers: [],
      items: [],
      defaultItem: {
        name: 'Team ' + 0,
        match: 'Match ' + 0,
        points: 0,
        boolean: '???',
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
        this.headers = [
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
        { text: 'Actions', value: 'name', sortable: false }
        ]

        this.items = [
        { name:'Team 174', match: 'Match 17', boolean: 'true', points: 16, text: 'sub B'},
        { name:'Team 175', match: 'Match 17', boolean: 'false', points: 0, text: 'get good'}
        ]
      },

      newRow () {
        this.items.push(this.defaultItem)
      }
    }
  }
</script>

<style scoped>

</style>
