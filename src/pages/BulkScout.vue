<template>
  <v-layout row justify-center>
    <Team3724Data team="2324"/>
  </v-layout>
</template>

<script>
import teamData from '@/components/teamData';
import Team3724Data from '@/components/Team3724Data';

export default {
  name: 'BulkScout',
  data() {
    return {

    };
  },
  components: {
    teamData, Team3724Data,
  },
};
</script>

<style scoped>

</style>
