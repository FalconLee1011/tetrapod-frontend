<template>
  <v-app>
    <div>
      <navbar />
      <router-view />
    </div>
  </v-app>
</template>

<style scoped>
  @import './assets/css/swal-dark.min.css';
</style>

<script>
import navbar from './components/misc/Navbar.vue'

export default {
  name: 'App',
  components: { navbar },
  mounted() {
    this.$vuetify.theme.dark
  },
}
</script>

<style>
* { font-family: Avenir, Helvetica, Arial, sans-serif; }
</style>
