<template>
  <LoginDialog :value="true" @input="doredir()" />
</template>

<script>
import LoginDialog from '@/components/LoginDialog';

export default {
  name: 'Login',
  components: {
    LoginDialog,
  },
  data() {
    return {};
  },
  methods: {
    doredir() {
      this.$router.push(this.$route.query.redir)
    }
  }
};
</script>

<style scoped>

</style>
