<template>
    <v-card
    elevation="14"
    tile
    class="mx-auto"
    max-width="700"
    >
    <v-card-text>
      消波塊商店
      <v-divider></v-divider>
      <v-subheader>
        <v-row>
          <v-col cols="5" >
          商品
          </v-col>
          <v-col cols="4" >
          數量
          </v-col>
          <v-col cols="3" >
          金額
          </v-col>
        </v-row>
      </v-subheader>
      <v-divider></v-divider>
      <p
        v-for="item in items"
        :key="item">
          <cartbar type="cart"></cartbar>
      </p>
      <div style="position:absolute;right:100px;font-weight:bold;">總金額<span style="font-size:200%;"> NT {{total}}</span></div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        結帳
      </v-btn>
    </v-card-actions>
    </v-card>
</template>

<script>
import cartbar from "./cart_bar.vue"
  export default {
      name: 'cart_card',
      components: { cartbar, },
      data: () => ({
        items: 3,
        total: 6666,
      }),
      props:{
        store: {
          name: String,
          merchant_id: [Number],
        }
      }
  }
</script>
