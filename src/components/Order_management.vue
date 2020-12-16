<template>
  <v-tabs>
    <v-tab v-model="tab">尚未處理</v-tab>
    <v-tab>待出貨</v-tab>
    <v-tab>已出貨</v-tab>
    <v-tab>已完成</v-tab>
    <v-tab-item>
      <order_card
      v-for="(order,index) in status"
      :buyer="order.buyer"
      :picurl="order.picurl"
      :idx="index"
      v-on:remove="remove($event)"
      :key="index"/>
    </v-tab-item>
    <v-tab-item>
      <order_card
      v-for="(order,index) in status"
      :picurl="order.picurl"
      :idx="index"
      :buyer="order.buyer"
      btn2="已出貨"
      :key="index"/>
    </v-tab-item>
    <v-tab-item>
      <order_card
      v-for="(order,index) in status"
      :picurl="order.picurl"
      :idx="index"
      :buyer="order.buyer"
      btn2="已完成"
      :key="index"/>
    </v-tab-item>
    <v-tab-item>
      <order_card
      v-for="(order,index) in status"
      :buyer="order.buyer"
      :picurl="order.picurl"
      :idx="index"
      btn2="null"
      :key="index"/>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import order_card from "./order/order_card.vue"
  export default {
    name: 'order_management',
    components: { order_card, },
    data(){
      return {
        status:[
            { picurl: "https://cf.shopee.tw/file/bbc54453123e477e829914365f59d9db",buyer: '消小塊' },
            { picurl: "https://lh3.googleusercontent.com/proxy/vp52wV4AQnQvt0SaeDoF_AucsjHhsG92JbZrYynXM7x8CVfUSF24c_8UWHkzSj4lFuwOcpeduHxfobaa5vWDDAV3z3bMs89qDQObkjaEq-xs5OH7U1-TqamqT9_lZs1JFCIPvcvMTEKpQf0", buyer: '初音ミク' },
            { picurl: "https://i.ytimg.com/vi/N_HKQw45S_M/maxresdefault.jpg", buyer: '弱音ハク' },
            { buyer: '巡音ルカ' },
        ],
      }
    },
    methods: {
      remove: function (e) {
        this.status.splice(e, 1)
      }
    }
  }
</script>
