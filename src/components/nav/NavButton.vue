<template>
  <v-btn raised><v-icon>{{ icon }}</v-icon>&nbsp;{{ title }}</v-btn>
  <v-btn :icon="icon2" flat :to="to"><v-icon>{{ icon }}</v-icon>&nbsp;{{ title }}</v-btn>
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
      icon2: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
