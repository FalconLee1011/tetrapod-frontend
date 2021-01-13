<template>
  <v-card class="mx-auto mt-5" max-width="70%">
    <v-card-title>訂單追蹤</v-card-title>
    <v-card-subtitle>您的訂單</v-card-subtitle>
    <v-tabs v-model="tab">
      <v-tab v-for="state in states" :key="state">
        {{ state }}
      </v-tab>
      <v-tab-item>
        <v-card-text>
          <v-data-table :headers="headers" :items="orders.running">
            <template v-slot:item._price="{ item }">
              NT {{ item.price.toLocaleString() }}
            </template>
            <template v-slot:item._state="{ item }">
              <span style="color: red;" v-if="item.status[item.cState].status == 'canceled'">
                {{ status2Zh[item.status[item.cState].status] }}
              </span>
              <span v-else>
                {{ status2Zh[item.status[item.cState].status] }}
              </span>
            </template>
            <template v-slot:item.act="{ item }">
              <v-btn :to="`/order-tracking/${item._id}`"> 詳細資訊 </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-tab-item>

      <v-tab-item>
        <v-card-text>
          <v-data-table :headers="headers" :items="orders.done">
            <template v-slot:item._price="{ item }">
              NT {{ item.price.toLocaleString() }}
            </template>
            <template v-slot:item._state="{ item }">
              <span style="color: red;" v-if="item.status[item.cState].status == 'canceled'">
                {{ status2Zh[item.status[item.cState].status] }}
              </span>
              <span v-else>
                {{ status2Zh[item.status[item.cState].status] }}
              </span>
            </template>
            <template v-slot:item.act="{ item }">
              <v-btn :to="`/order-tracking/${item._id}`"> 詳細資訊 </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-tab-item>

      <v-tab-item>
        <v-card-text>
          <v-data-table :headers="headers" :items="orders.cancled">
            <template v-slot:item._price="{ item }">
              NT {{ item.price.toLocaleString() }}
            </template>
            <template v-slot:item._state="{ item }">
              <span style="color: red;" v-if="item.status[item.cState].status == 'canceled'">
                {{ status2Zh[item.status[item.cState].status] }}
              </span>
              <span v-else>
                {{ status2Zh[item.status[item.cState].status] }}
              </span>
            </template>
            <template v-slot:item.act="{ item }">
              <v-btn :to="`/order-tracking/${item._id}`"> 詳細資訊 </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
const API_PREFIX = process.env.VUE_APP_API_PREFIX;

export default {
  // merchant_id:"",
  // user_id:"",
  // status:"",
  // approve:""
  data() {
    return {
      tab: 0,
      states:[
        "進行中", "已完成", "已取消",
      ],
      status2Zh: {
        "newed": "訂單成立", 
        "confirmed": "賣家已承認訂單", 
        "contacted": "買賣方已聯繫", 
        "shipping": "運送中", 
        "doneShipping": "完成運送", 
        "doneGatering": "完成取貨", 
        "canceled": "訂單已取消", 
      }, 
      headers: [
        { text: "賣家", value: "market" },
        { text: "訂單金額", value: "_price" },
        { text: "狀態", value: "_state" },
        { text: "管理", value: "act" },
      ],
      orders: {
        running:[],
        done:[],
        cancled:[],
      },
    };
  },
  mounted() {
    this.$emit("loading");
    this.fetchOrders();
  },
  methods: {
    async fetchOrders(){
      this.$emit("loading");
      const res = await this.$axios.get(
        `${API_PREFIX}/merchant/order/get-orders/buyer`,
        {
          headers: {
            token: this.$store.getters.token
          }
        },
      );
      console.log(res.data.orders);
      const orders = res.data.orders
      for (let idx = 0; idx < orders.length; idx++) {
        const o = orders[idx];
        if(o.status[o.cState].status == 'doneGatering') 
          this.orders.done.push(o)
        else if(o.status[o.cState].status == 'canceled') 
          this.orders.cancled.push(o)
        else
          this.orders.running.push(o)
      }
      this.$emit("doneloading");
    }
  },
};
</script>