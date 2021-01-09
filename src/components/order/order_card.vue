<template>
  <v-card
    elevation="17"
    tile
    class="mx-auto"
    max-width="700"
    style="margin-bottom: 1rem"
  >
    <v-card-text style="padding-bottom: 0">
      <v-avatar color="primary" size="30">
        <img :src="picurl" />
      </v-avatar>
      <span style="color: white"> 來自 {{ buyer }} 的訂單</span>
      <v-divider></v-divider>
      <v-data-table :headers="headers" :items="items">
        <template v-slot:item.merchant="{ item }">
            <v-list-item>
              <v-list-item-avatar size="40" class="rounded-0">
                <!-- <img v-if=item.photoSRC :src="item.photoSRC" /> -->
                <img :src="item.photoSRC" />
                <!-- <v-icon v-else>mdi-border-none-variant</v-icon> -->
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ item.merchant_name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <div style="margin-right: 1rem">
        總價<span style="font-size: 130%; font-weight: bold">
          NT {{ total }}</span
        >
      </div>
      <v-btn
        :color="(btn1 == '聯絡買家') ? 'primary' : 'error'"
        style="color: black"
        @click="$emit('act1', {idx: idx, id: id, buyer: buyer})"
        v-if="btn2 != 'null'"
      >
        {{ btn1 }}
      </v-btn>
      <v-btn 
        color="secondary" 
        style="color: black" 
        v-if="btn2 != 'null'"
        @click="$emit('confirm', {idx: idx, id: id, buyer: buyer})"
      >
        {{ btn2 }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import cartbar from "../cart/cart_bar.vue";
// import { mapActions } from 'vuex';

export default {
  name: "order_card",
  // components: { cartbar },
  data() {
    return {
      headers: [
       { text: "商品", value: "merchant" }, 
       { text: "數量", value: "merchant_count" }, 
       { text: "金額", value: "price" }, 
      ]
    }
  },
  props: {
    id: {
      type: String,
    },
    picurl: {
      type: String,
      default:
        "https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png",
    },
    buyer: {
      type: String,
      default: "消小塊",
    },
    total: {
      type: Number,
      default: 6666,
    },
    btn1: {
      type: String,
      default: "取消訂單",
    },
    btn2: {
      type: String,
      default: "接受訂單",
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    idx: Number,
  },
};
</script>
