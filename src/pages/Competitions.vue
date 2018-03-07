<template>
  <div id="main">
    <h1>Vue Dragable For</h1>
       
    <div class="drag">
      <h2>Draggable</h2>
      <draggable :list="list" class="dragArea">
        <div v-for="element in list">{{ element.name }}</div>
      </draggable>
    </div>

    <div class="normal">
      <h2>Normal v-for</h2>
      <div class="dragArea">
        <div v-for="element in list">{{ element.name }}</div>
      </div>
    </div>

    <button @click="add"> Add</button>
    <button @click="replace"> Replace</button>
  </div>
</template>

<script>
import draggable from 'vuedraggable'; // Is this correct? Might be the issue here

export default {
	
  components: {
    draggable,
  },
  name: 'Competitions',

  data() {
    return {
      list: [{ name: 'John' }, 
				{ name: 'Joao' }, 
				{ name: 'Jean' }],
    };
  },

  methods: {
    add() {
      this.list.push({ name: 'Juan' });
    },
    replace() {
      this.list = [{ name: 'Edgard' }];
    },
  },
};
</script>

<style scoped>
.normal {
    background-color: grey;
}
.drag {
    background-color: green;
}
.dragArea{
     min-height: 10px;	
}
</style>
