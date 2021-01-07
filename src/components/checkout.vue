<template>
  <v-card
    elevation="14"
    tile
    class="mx-auto"
    max-width="1000"
    style="margin-top: 2rem; margin-bottom: 2rem"
  >
    <v-card-title class="headline">結帳</v-card-title>
    <div style="padding: 20px">
      <v-card-subtitle style="font-size: 130%; color: white"
        >您與 {{ this.$route.params.market }} 的訂單</v-card-subtitle
      >
      <v-card-text>
        <!-- {{ name }}
        <v-divider></v-divider>
        <v-subheader>
          <v-row>
            <v-col cols="5"> 商品 </v-col>
            <v-col cols="4"> 數量 </v-col>
            <v-col cols="3"> 金額 </v-col>
          </v-row>
        </v-subheader>
        <v-divider></v-divider>
        <p v-for="item in items" :key="item">
          <cartbar value="1"></cartbar>
        </p> -->
        <v-data-table
          :headers="headers"
          :items="merchants"
        >
          <template v-slot:item.merchant_card="{ item }">
              <v-list-item>
                <v-list-item-avatar color="primary" size="40" class="rounded-0">
                  <img v-if=item.photo :src="item.photoSRC" />
                  <v-icon v-else>mdi-none</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item.merchant_name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
          </template>
        </v-data-table>
      </v-card-text>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="3">
        <v-select 
          :items="shipment"
          v-model="form.shipmentMethod"
          label="運送方式"
          max-width="4rem"
          auto-select-first
          item-text="text"
          item-value="value"
        />
      </v-col>
      <div class="mx-6" style="font-weight: bold">
        總金額<span style="font-size: 200%"> NT {{ total }}</span>
      </div>
      <v-btn @click="new_order" color="primary"> 結帳 </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import cartbar from "./cart/cart_bar.vue";
const API_PREFIX = process.env.VUE_APP_API_PREFIX;
import { mapActions } from "vuex";

export default {
  name: "cart_card",
  // components: { cartbar },
  data: () => ({
    name: "消波塊商店",
    total: 0,
    headers: [
      {text: "商品", value: "merchant_card"}, 
      {text: "數量", value: "merchant_count"}, 
      {text: "單價", value: "price"}
    ],
    merchants: [],
    shipment: [
      {text: "面交", value: "ftf"}
    ],
    form:{
      shipmentMethod: "ftf",
    }
  }),
  props: {
    store: {
      name: String,
      merchant_id: [Number],
    },
  },
  mounted() {
    this.$emit("loading");
    this.fetchCheckout()
  },
  methods: {
    ...mapActions( [ "generateBlob" ] ),
    async fetchCheckout(){
      const res = await this.$axios.post(
        `${API_PREFIX}/merchant/get-cart-by-market`,
        {
          market: this.$route.params.market
        },
        {
          headers:{
            token: this.$store.getters.token
          }
        }
      )
      console.log(res);
      let merchs = res.data.merchants;
      for (var i = 0; i < merchs.length; i++) {
        if(merchs[i].photo != null)
          merchs[i].photoSRC = await this.generateBlob(merchs[i].photo[0]);
        this.total += merchs[i].price * merchs[i].merchant_count;
      }
      this.merchants = res.data.merchants;
      this.$emit("doneloading");
    },
    async new_order(){
      this.$emit("loading", {text: "正在處理您的訂單，請勿離開"});
      const res = await this.$axios.post(
        `${API_PREFIX}/merchant/order/new-order`,
        {
          market: this.$route.params.market,
          shipment: this.form.shipmentMethod
        },
        {
          headers:{
            token: this.$store.getters.token
          }
        }
      );
      console.log(res);
      if (res.data.status == "ok") {
        this.$swal({
          icon: 'success',
          title: `訂單已送出！`,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: `前往追蹤訂單`,
          cancelButtonText: `完成`,
        }).then((r) => {
            if(r.isConfirmed){ this.$router.push(`/order-tracking/${res.data.order_id}`) }
            else{ this.$router.push(`/cart`) }
          })
        ;
      }
      this.$emit("doneloading");
    },
  },
};
</script>
