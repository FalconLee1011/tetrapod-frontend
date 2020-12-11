<template>
  <v-card
    :loading=false
    class="mx-auto mt-5"
    elevation="3"
    :load="load"
  >
    <profileBanner 
      :title="title"
      :uploader="uploader"
      type="merchantCard" 
    />
    <v-img
      class="white--text align-end hover"
      height="15em"
      :src="image"
      @click="$router.push(`/merchant/${merchantID}`)"
    />
    <v-card-text @click="$router.push(`/merchant/${merchantID}`)" class="hover" >
      {{intro}}
    </v-card-text>
    <v-card-actions>
      <v-btn color=secondary text elevation=0 >NT {{price.toLocaleString()}}</v-btn>
      <v-spacer />
      <v-btn color=primary text elevation=0 >放入購物車</v-btn>
      <v-btn @click="$router.push(`/merchant/${merchantID}`)" color=primary text elevation=0 >查看更多</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import profileBanner from "../profile/profileBanner.vue"
export default {
  components: { profileBanner, },
  props:{
    title: {
      type: String,
      default: "Merchant"
    },
    uploader: {
      type: String,
      default: "Uploader"
    },
    type: {
      type: Number,
    },
    image: {
      type: String,
      default: "https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"
    },
    intro:{
      type: String,
      default: "商品介紹..."
    },
    price: {
      type: Number,
      default: 9876
    },
    merchantID: {
      type: String,
      default: "c8763c8763c8763c8763c8763"
    }
  }
}
</script>

<style scoped>
.hover:hover {
  cursor: pointer !important;
}
</style>