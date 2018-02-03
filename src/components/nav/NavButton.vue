<template>
  <v-btn raised><v-icon>{{ icon }}</v-icon>&nbsp;{{ title }}</v-btn>
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
        required: true,
      },
    },
  };
</script>
