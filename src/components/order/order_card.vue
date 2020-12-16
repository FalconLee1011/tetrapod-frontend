<template>
    <v-card
    elevation="17"
    tile
    class="mx-auto"
    max-width="700"
    style="margin-bottom: 1rem"
    >
    <v-card-text style="padding-bottom:0">
        <v-avatar color="primary" size="30">
            <img :src=picurl>
        </v-avatar>
        <span style="color:white"> 來自 {{ buyer }} 的訂單</span>
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
          <cartbar value=3></cartbar>
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <div style="margin-right: 1rem">總價<span style="font-size:130%;font-weight:bold;"> NT {{total}}</span></div>
      <v-btn
        color="error" 
        style="color: black;"
        @click="$emit('remove',idx)"
        v-if="btn2!='null'"
      >
        取消訂單
      </v-btn>
      <v-btn
        color="secondary" 
        style="color: black;"
        v-if="btn2!='null'"
      >
        {{ btn2 }}
      </v-btn>
    </v-card-actions>
    </v-card>
</template>

<script>
import cartbar from "./cart/cart_bar.vue"
  export default {
      name: 'order_card',
      components: { cartbar, },
      props:{
          picurl:{
            type: String,
            default: "https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"
          },
          buyer: {
            type: String,
            default: "消小塊"
          },
          total: {
            type: Number,
            default: 6666
          },
          btn2: {
            type: String,
            default: "接受訂單"
          },
          items: {
            type: Number,
            default: 3
          },
          idx:Number,
      }
  }
</script>
