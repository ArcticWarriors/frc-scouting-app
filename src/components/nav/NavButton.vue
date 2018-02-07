<template>
  <v-btn flat :icon="smallButton" :to="to" @click="$emit('click')"><v-icon>{{ icon }}</v-icon>&nbsp;{{ title }}</v-btn>
</template>

<script>
  export default {
    name: 'NavButton',
    props: {
      to: {
        type: String,
        default: '',
      },
      icon: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
      smallButton: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
