<template>
  <v-btn :to="to" :icon="$vuetify.breakpoint.xsOnly" :disabled="disabled"
         flat @click="$emit('click')">
    <v-icon>{{ icon }}</v-icon>&nbsp;
    <template v-if="$vuetify.breakpoint.smAndUp">{{ title }}</template>
  </v-btn>
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
