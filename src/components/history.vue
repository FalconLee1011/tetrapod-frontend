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
    <v-card-title>瀏覽紀錄</v-card-title>
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
              :type=item.is_bidding
              :hasBeenWon=item.hasBeenWon
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
    scrollWatcher: function(){
      // console.log(window.scrollBy);
    },
    fetchData: async function () {
      const res = await this.$axios.get(`${API_PREFIX}/tracking/browsing-history/get`,
          {
            headers: {
              token: this.$store.getters.token,
            },
          });
      const tmp=res.data.history.browsing_history;
      console.log(tmp);
      for (let idx = 0; idx < tmp.length; idx++){
        try {
          const result = await this.$axios.get(`${API_PREFIX}/merchant/get?id=${tmp[idx]}`);
          console.log(result.data.merchant);
          this.items.push(result.data.merchant);
        } catch (error) {
          console.log(error);
        }
      }
      this.isLoading = false;
    }
  },
}
</script>