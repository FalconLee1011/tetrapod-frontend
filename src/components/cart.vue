<template>
  <v-card
    tile
    class="mx-auto"
    max-width="800"
    style="background-color: #323232; margin: 1rem 0"
  >
    <v-card-title class="headline"> 購物車 </v-card-title>
    <v-card-text>
      <cart_card 
        v-for="item in items" 
        :key="item"
        style="margin-bottom: 2rem"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import cart_card from "./cart/cart_card.vue";
export default {
  name: "cart",
  components: { cart_card },
  data: () => ({
    items: 3,
  }),
};
</script>
