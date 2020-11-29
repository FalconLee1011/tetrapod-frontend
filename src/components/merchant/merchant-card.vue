<template>
  <v-card
    :loading=false
    class="mx-auto mt-5"
    elevation="3"
    :load="load"
  >
    <profileBanner type="merchantCard"/>
    <v-img
      class="white--text align-end"
      height="15em"
      src="https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"
    />
    <v-card-text>
      商品介紹.........
    </v-card-text>
    <v-card-actions>
      <v-btn color=secondary text elevation=0 >NT 9,876</v-btn>
      <v-spacer />
      <v-btn color=primary text elevation=0 >放入購物車</v-btn>
      <v-btn color=primary text elevation=0 >查看更多</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import profileBanner from "../profile/profileBanner.vue"
export default {
  components: { profileBanner, },
  props:{
    price: {
      title: String,
      uploader: String,
      type: Number,
    }
  }
}
</script>