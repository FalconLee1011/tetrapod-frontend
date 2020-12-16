<template>
<div>
  <v-row style="height:60px;overflow:hidden;line-height:40px;">
      <v-col cols="1">
        <v-avatar color="primary" size="40" class="rounded-0">
          <img :src=img>
        </v-avatar>
      </v-col>

      <v-col cols="4">
        {{ name }}
      </v-col>

      <v-col cols="4" v-if="(type == 'cart')">
        <countstepper></countstepper>
      </v-col>
      <v-col cols="4" v-if="(type != 'cart')">
        {{ value }}
      </v-col>

      <v-col cols="3">
        {{ price }}
      </v-col>
  </v-row>
  <v-divider></v-divider>
</div>
</template>

<script>
import countstepper from "../misc/countstepper.vue"
  export default {
      name: 'cart_bar',
      components: { countstepper, },
      props:{
        img:{
          type:String,
          default:"https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"
        },
        name:{
          type:String,
          default:"Merchant"
        },
        value: {
          type:Number,
          default:1
        } ,
        price:{
          type:Number,
          default:2222
        } ,
        type: {
          type:String,
          default:"cart"
        },
      }
  }
</script>
