<template>
  <v-card class="mx-auto mt-5 pb-10" max-width="70%">
    <v-card-title>訂單追蹤</v-card-title>
    <v-card-subtitle>您的訂單</v-card-subtitle>
      <v-tabs v-model="tab">
        <v-tab>尚未處理</v-tab>
        <v-tab>待出貨</v-tab>
        <v-tab>已出貨</v-tab>
        <v-tab>已完成</v-tab>
        <v-tab-item class="mt-3">
          <order_card
          v-for="(order,index) in orders.todo"
          :buyer="order.buyer"
          :picurl="order.picurl"
          :idx="index"
          :id="order._id"
          :total="order.price"
          :items="order.merchants"
          v-on:remove="remove($event)"
          v-on:confirm="confirm($event)"
          :key="index"/>
        </v-tab-item>
        <v-tab-item>
          <order_card
          v-for="(order,index) in orders.running"
          :buyer="order.buyer"
          :picurl="order.picurl"
          :idx="index"
          :id="order._id"
          :total="order.price"
          :items="order.merchants"
          v-on:remove="remove($event)"
          v-on:confirm="confirm($event)"
          :key="index"/>
        </v-tab-item>
        <v-tab-item>
          <order_card
          v-for="(order,index) in orders.going"
          :buyer="order.buyer"
          :picurl="order.picurl"
          :idx="index"
          :id="order._id"
          :total="order.price"
          :items="order.merchants"
          v-on:remove="remove($event)"
          v-on:confirm="confirm($event)"
          :key="index"/>
        </v-tab-item>
        <v-tab-item>
          <order_card
          v-for="(order,index) in orders.done"
          :buyer="order.buyer"
          :picurl="order.picurl"
          :idx="index"
          :id="order._id"
          :total="order.price"
          :items="order.merchants"
          v-on:remove="remove($event)"
          v-on:confirm="confirm($event)"
          :key="index"/>
        </v-tab-item>
      </v-tabs>
  </v-card>
</template>

<script>
import order_card from "./order/order_card.vue";
import { mapActions } from 'vuex';
const API_PREFIX = process.env.VUE_APP_API_PREFIX;

export default {
  // merchant_id:"",
  // user_id:"",
  // status:"",
  // approve:""
  components: { order_card },
  data() {
    return {
      tab: 0,
      states:[
        "進行中", "已完成", "已取消",
      ],
      headers: [
        { text: "賣家", value: "market" },
        { text: "訂單金額", value: "_price" },
        { text: "狀態", value: "_state" },
        { text: "管理", value: "act" },
      ],
      orders: {
        todo:[],
        running:[],
        going:[],
        done:[],
      },
    };
  },
  mounted() {
    this.$emit("loading");
    this.fetchOrders();
  },
  methods: {
    ...mapActions([ "generateBlob" ]),
    remove(event) {
      console.log(event);
      this.updateOrder(event.id, 'rm')
      // this.status.splice(event.idx, 1)
    },
    confirm(event) {
      console.log(event);
      this.updateOrder(event.id, 'cfn')
      // this.status.splice(event.idx, 1)
    },
    async updateOrder(id, action){
      this.$emit("loading");
      const res = await this.$axios.post(
        `${API_PREFIX}/merchant/order/update-order`,
        {
          orderID: id,
          action: action,
        },
        {
          headers: {
            token: this.$store.getters.token
          }
        },
      );
      console.log(res);
      this.$emit("doneloading");
    },
    async fetchOrders(){
      this.$emit("loading");
      const res = await this.$axios.get(
        `${API_PREFIX}/merchant/order/get-orders/seller`,
        {
          headers: {
            token: this.$store.getters.token
          }
        },
      );
      const resOrders = res.data.orders
      for (let idx = 0; idx < resOrders.length; idx++) {
        const order = resOrders[idx];
        for (let oIdx = 0; oIdx < order.merchants.length; oIdx++) {
          const orderMerchant = order.merchants[oIdx];
          if(orderMerchant.photo){
            const photoSRC = await this.generateBlob(orderMerchant.photo[0]);
            resOrders[idx].merchants[oIdx].photoSRC = photoSRC;
          }
        }
        // todo:[],
        // running:[],
        // going:[],
        // done:[],
        const s = order.status[order.cState].status;
        if(s == 'newed')
          this.orders.todo.push(order)
        else if(s == 'confirmed' || s == 'contacted')
          this.orders.running.push(order)
        else if(s == 'shipping' || s == 'doneShipping')
          this.orders.going.push(order)
        else
          this.orders.done.push(order)
      }
      this.$emit("doneloading");
    }
  },
};
</script>
