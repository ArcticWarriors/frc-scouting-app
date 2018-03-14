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
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.match }}</td>
        <td class="text-xs-right">{{ props.item.boolean }}</td>
        <td class="text-xs-right">{{ props.item.points }}</td>
        <td class="text-xs-right">{{ props.item.text }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
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
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Team" v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Match #" v-model="editedItem.match"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Boolean" v-model="editedItem.boolean"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Points Exchanged" v-model="editedItem.points"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Text Example" v-model="editedItem.text"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

  export default {
    data: () => ({
      search: '',
      dialog: false,
      headers: [],
      items: [],
      editedIndex: -1,
      editedItem: {
        name: 'Team ' + 0,
        match: 'Match ' + 0,
        points: 0,
        boolean: 0,
        text: 'none'
      },
      defaultItem: {
        name: 'Team ' + 0,
        match: 'Match ' + 0,
        points: '',
        boolean: 0,
        text: 'none'
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

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
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>

<style scoped>

</style>
