<template>
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
