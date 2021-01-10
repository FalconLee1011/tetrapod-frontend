<template>
  <v-card
    tile
    class="mx-auto"
    max-width="800"
    style="background-color: #323232; margin: 1rem 0"
  >
    <v-card-title class="headline"> 購物車 </v-card-title>
    <v-card-text
      v-if="ready"
    >
      <cart_card 
        v-for="(market, idx) in marketItems" 
        :key="idx"
        style="margin-bottom: 2rem"
        :name=market.account
        :merchants=market.items
        :total=market.total
        v-on:refresh="fetchCart"
      />
    </v-card-text>
    <v-card-text v-if="Object.keys(marketItems).length == 0">
      <v-row
        class="fill-height mt-0"
        align="center"
        justify="center"
      >
        <v-col
          align="center"
          justify="center"
        >
          <v-icon
            style="vertical-align: middle !important;"
            class="mt-16 mb-5"
            size="10rem"
          >mdi-cart-outline</v-icon>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          align="center"
          justify="center"
          class="mb-16"
          style="font-size: 1.4rem;"
        >看來你的購物車是空的！</v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import cart_card from "./cart/cart_card.vue";
import { mapActions } from 'vuex';

const API_PREFIX = process.env.VUE_APP_API_PREFIX;
export default {
  name: "cart",
  components: { cart_card },
  data(){
    return {
      items: 3,
      marketItems:{},
      ready: false,
    }
  },
  mounted() {
    this.$emit('loading');
    this.fetchCart();
  },
  methods: {
    ...mapActions(
      [
        "generateBlob"
      ]
    ),
    async fetchCart(){
      this.marketItems={};
      let markets = new Set([]);
      const res = await this.$axios.get(
        `${API_PREFIX}/merchant/get_cart`,
        {
          headers:{
            token: this.$store.getters.token
          }
        }
      );
      let data = res.data;
      if(data.merchants == undefined) {
        this.$emit('doneloading');
        return;
      }
      for (let idx = 0; idx < data.merchants.length; idx++) {
        const el = data.merchants[idx];
        console.log(el);
        if(Object.keys( this.marketItems ).indexOf(el.account) == -1)
          this.marketItems[el.account] = { account: el.account, items: [], total: 0 }
        this.marketItems[el.account].items.push(el);
        this.marketItems[el.account].total += parseInt(el.price) * parseInt(el.merchant_count);
        markets.add(el.account);
      }
      await this.fetchMarkets(markets);
      console.log("READY");
      this.ready = true;
      this.$emit('doneloading');
      let clone = {};
      Object.assign(clone, this.marketItems);
      this.marketItems = clone;
    },
    async fetchMarkets(markets){
      markets.forEach(async market => {
        const res = await this.$axios.post(
          `${API_PREFIX}/accounts/get`, 
          {
            account: market
          }
        )
        this.marketItems[market].avator = res.data.account_avator;
      });
    }
  },
};
</script>
