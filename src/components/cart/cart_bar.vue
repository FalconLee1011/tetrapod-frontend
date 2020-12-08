<template>
<div>
  <v-list-item>
    <v-list-item-avatar color="primary" size="40" class="rounded-0">
      <img src="https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png">
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>Merchant</v-list-item-title>
    </v-list-item-content>

    <v-list-item-content>
      <v-list-item-title><countstepper></countstepper></v-list-item-title>
    </v-list-item-content>

    <v-list-item-content>
      <v-list-item-title>NT 2,222</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
  <v-divider></v-divider>
</div>
</template>

<script>
import countstepper from "../misc/countstepper.vue"
  export default {
      name: 'cart_bar',
      components: { countstepper, },
      props:{
        merchant: {
          img: String,
          name: String,
          howmany: Number,
          cost: Number,
        }
      }
  }
</script>
