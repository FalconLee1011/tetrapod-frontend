<template>
  <v-card
    :loading=false
    class="mx-auto mt-5"
    elevation="3"
  >
    <profileBanner 
      :title="title"
      :uploader="uploader"
      type="merchantCard" 
    />
    <div
      class="white--text align-end hover"
      v-if="imageNotUploaded || imageNotFound"
      style="height: 15em; width:100%;"
      @click="$router.push(`/merchant/${merchantID}`)"
    >
      <v-row
        class="fill-height mt-0"
        align="center"
        justify="center"
      >
        <v-icon 
          class="mx-auto"
          style="vertical-align: middle !important;"
          size="7rem"
        >{{errorIcon}}</v-icon>
      </v-row>
      <v-row
        align="center"
        justify="center"
        style="margin-top: -2.5rem"
      >
        {{errorMsg}}
      </v-row>
    </div>
    <v-img
      class="white--text align-end hover"
      height="15em"
      :src="imageSrc"
      v-if="imageSrc"
      @click="$router.push(`/merchant/${merchantID}`)"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="primary"
            v-if="!imageSrc"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <v-card-text @click="$router.push(`/merchant/${merchantID}`)" class="hover" >
      {{intro}}
    </v-card-text>
    <v-card-actions>
      <v-btn color=secondary text elevation=0 >NT {{price.toLocaleString()}}</v-btn>
      <v-spacer />
      <v-btn @click="putInCart" color=primary text elevation=0 :disabled=isAddingToCart>
        <v-progress-circular v-if="isAddingToCart" size="18" width="2" indeterminate color="primary" />
        放入購物車
      </v-btn>
      <v-btn @click="$router.push(`/merchant/${merchantID}`)" color=primary text elevation=0 >查看更多</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import profileBanner from "../profile/profileBanner.vue"
import { mapActions } from 'vuex'
const API_PREFIX = process.env.VUE_APP_API_PREFIX;

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
    image:{
      default: []
    },
    intro:{
      type: String,
      default: "商品介紹..."
    },
    price:{
      type: String,
      default: "9876"
    },
    merchantID: {
      type: String,
      default: "c8763c8763c8763c8763c8763"
    }
  },
  data() {
    return {
      imageSrc: undefined,
      imageNotUploaded: false,
      imageNotFound: false,
      isAddingToCart: false,
    }
  },
  computed: {
    errorMsg(){
      if(this.imageNotUploaded) return "賣家似乎沒有上傳圖片:p";
      return "噢不！我們的伺服器上沒有這張照片:(";
    },
    errorIcon(){
      if(this.imageNotUploaded) return "mdi-image-off-outline";
      return "mdi-border-none-variant";
    }
  },
  async mounted() {
    await this.fetchImage();
  },
  methods: {
    ...mapActions([
      'generateBlob',
    ]),
    fetchImage: async function(){
      if(this.image == null || this.image.length == 0) { this.imageNotUploaded = true; return; }
      const blob = await this.generateBlob(this.image[0]);
      if(blob){ this.imageSrc = blob; }
      else{ this.imageNotFound = true; }
    },
    async putInCart(){
      this.isAddingToCart = true;
      const res = await this.$axios.post(
        `${API_PREFIX}/merchant/add_to_cart`,
        {
          merchant_id: this.merchantID,
        },
        {
          headers:{
            token: this.$store.getters.token
          }
        }
      );
      console.log(res);
      if(res.data.status == "added"){
        this.isAddingToCart = false;
        this.$toast.success(`已將 ${res.data.merchant.merchant_name} 加入您的購物車！`,
          {
            timeout: 2000,
            position: 'top-right'
          }
        )
      }
    },
  },
}
</script>

<style scoped>
.hover:hover {
  cursor: pointer !important;
}
</style>