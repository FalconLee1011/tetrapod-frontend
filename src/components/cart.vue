<template>
    <v-card
    tile
    class="mx-auto"
    max-width="800"
    style="background-color:#323232;"
    >
    <v-card-title class="headline" >
        購物車
    </v-card-title>
    <p v-for="item in items"
        :key="item">
    <cart_card/><br><br>
    </p>
    </v-card>
</template>

<script>
import cart_card from "./cart/cart_card.vue"
  export default {
      name: 'cart',
      components: { cart_card, },
      data: () => ({
          items:3,
      }),
  }
</script>
