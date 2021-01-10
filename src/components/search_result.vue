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
    <v-card-title> 的搜尋結果
      <advancedSearch 
        class="ml-5"
        v-on:setAdvReq="$emit('advSearch', $event)"
      />
    </v-card-title>
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
import advancedSearch from './misc/search'
const API_PREFIX = process.env.VUE_APP_API_PREFIX;
const advKeys = ["keyword", "rating", "isGeneral", "isBidding", "minPrice", "maxPrice", "isNew", "old"];

export default {
  components: { mCard, advancedSearch,  },
  data() {
    return {
      items: [],
      isLoading: true,
      requirement:{},
      x:10,
    }
  },
  mounted() {
    this.search();
  },
  methods: {
    search: async function () {
      let search = {};
      this.items = {};
      let url = new URL(window.location.href);
      for (const i in advKeys) {
        const k = advKeys[i];
        const cdt = url.searchParams.get(k);
        if(cdt) search[k] = cdt;
      }
      //this.isLoading = true;
      let res = await this.$axios.post(
        `${API_PREFIX}/merchant/search`,
        search, 
      );
      console.log(res);
      this.items = res.data.merchants;
      this.$emit("doneloading");
      this.isLoading = false;
    },
  },
}
</script>