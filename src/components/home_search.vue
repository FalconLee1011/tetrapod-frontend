<template>
  <v-card
    class="mx-auto mt-5"
    elevation="3"
    min-width="90%"
    min-height="45vh"
    max-width="95%"
  >
    <v-overlay
      absolute
      :value="isLoading"
    >
      <v-progress-circular
        class="mx-10"
        indeterminate
        color="primary"
        size="150"
        width="5"
      >讀取中...</v-progress-circular>
    </v-overlay>
    <v-card-title>Home</v-card-title>
    <v-card-text>
      <v-lazy
        :options="{
          threshold: .5
        }"
        min-height="200"
        transition="fade-transition"
      >
        <v-row>
          <v-col
            cols="12"
            sm="3"
            v-for="(item, index) in items"
            :key="index"
            max-width="20%"
          >
            <mCard
              :title=item.merchant_name
              :uploader=item.account
              :image=item.photo
              :intro=item.discription
              :price=item.price
              :merchantID=item._id
            />
          </v-col>
        </v-row>
      </v-lazy>
    </v-card-text>
  </v-card>
</template>

<script>
import mCard from "./merchant/merchant-card.vue"
const API_PREFIX = process.env.VUE_APP_API_PREFIX;

export default {
  components: { mCard, },
  data() {
    return {
      items: [],
      isLoading: true,
      requirement:{},
      x:10,
    }
  },
  created () {
    // window.addEventListener('scroll', this.scrollWatcher);
  },
  mounted() {
    // console.log(process.env.VUE_APP_API_PREFIX);
    this.fetchData();
  },
  destroyed () {
    // window.removeEventListener('scroll', this.scrollWatcher);
  },
  methods: {
    fetchData: async function () {
      this.requirement = this.$route.query.data;
      console.log("new_or_not")
      console.log(this.requirement.new_or_not);
      console.log("bidding")
      console.log(this.requirement.bidding_or_not);
      //this.isLoading = true;
      let res = await this.$axios.post(
        `${API_PREFIX}/merchant/get`,
        {
          "query":{
            "is_bidding":{"$ne":this.requirement.bidding_or_not},
            "status":{"$ne":this.requirement.new_or_not},
            "price":{"$gte":this.requirement.low_price,"$lte":this.requirement.high_price}
            
          },
        }
      );
      this.items = res.data.merchants;
      this.isLoading = false;
    },
  },
}
</script>