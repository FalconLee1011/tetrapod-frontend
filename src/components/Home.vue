<template>
  <v-card
    class="mx-auto mt-5"
    elevation="3"
    min-width="90%"
    max-width="95%"
  >
    <v-card-title>Home</v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          sm="3"
          v-for="item in items"
          :key="item"
          max-width="20%"
        >
          <mCard/>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import mCard from "./merchant/merchant-card.vue"
export default {
  components: { mCard, },
  data() {
    return {
      items: 3,
    }
  },
  created () {
    window.addEventListener('scroll', this.scrollWatcher);
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollWatcher);
  },
  methods: {
    scrollWatcher: function(){
      console.log(window.scrollBy);
    },
  },
}
</script>