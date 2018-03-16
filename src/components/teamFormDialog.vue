<template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs4>
                <v-text-field label="Team" v-model="editedItem.name"></v-text-field>
              </v-flex>
              <v-flex xs14>
                <v-text-field label="Match #" v-model="editedItem.match"></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
          <v-flex xs4>
            <v-select :items="['True','False']" label="Boolean" 
          :rules="[text => !!text || 'Text is required.']" v-model="editedItem.boolean"></v-select>
          </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field :rules="[number => !!number || 'Number is required.']" 
                label="Points Exchanged" v-model="editedItem.points"></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12>
                <v-text-field
                name="input-1"
                label="Label Text"
                :rules="[(v) => v.length <= 250 || 'Max 250 characters']"
                :counter="250"                
                textarea
                v-model="editedItem.text"
              ></v-text-field>
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
</template>

<script>
  import teamFormData from '@/components/teamFormData'
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
        boolean: '???',
        text: 'none'
      },
      defaultItem: {
        name: 'Team ' + 0,
        match: 'Match ' + 0,
        points: 0,
        boolean: '???',
        text: 'none'
      }
    }),
    components:
      {teamFormData},
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

        this.items = [
        { name:'Team 174', match: 'Match 17', boolean: 'true', points: 16, text: 'sub B'},
        { name:'Team 175', match: 'Match 17', boolean: 'false', points: 0, text: 'get good'}
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
