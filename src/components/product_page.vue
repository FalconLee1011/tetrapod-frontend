<template>
  <v-card v-if="isReady" class="mx-auto mt-5 pa-10" min-width="80%" max-width="90%">
    <v-overlay v-if="!isReady">
      <v-progress-circular
        indeterminate
        color="primary"
        v-if="!isReady"
        size=125
      ></v-progress-circular>
    </v-overlay>
    <v-card-title>
      <h2>{{ merchant_name }}</h2>
    </v-card-title>
    <v-row>
      <v-col cols="6" class="pa-10">
        <v-card color="grey darken-3">
          <div
            class="white--text align-end hover"
            v-if="imageNotUploaded || imageNotFound"
            style="height: 30em; width:100%;"
          >
            <v-row
              class="fill-height mt-0"
              align="center"
              justify="center"
            >
              <v-icon 
                class="mx-auto"
                style="vertical-align: middle !important;"
                size="14rem"
              >{{errorIcon}}</v-icon>
            </v-row>
            <v-row
              align="center"
              justify="center"
              style="margin-top: -7rem"
            >
              {{errorMsg}}
            </v-row>
          </div>
          <v-img
            v-if="!imageNotUploaded && !imageNotFound"
            :src="picUrls[selectedPhotoIndex]"
            max-height="25em"
            contain
          ></v-img>
        </v-card>
        <v-row
          class="mt-5 pa-0"
          align="center"
          justify="center"
          height="5rem !important"
          v-if="isReady && picUrls.length == photo.length && !imageNotUploaded && !imageNotFound"
        >
          <v-col align="center">
            <v-btn 
              icon
              @click="shiftBasePicIndex(-1)"
              :disabled="basePicIndex == 0"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>
          <v-col 
            class="image mr-1 ml-1"
            align="center"
            cols="2"
            v-for="i in 4"
            :key="i"
            :id="`pic${i}`"
            :class="{selected: (basePicIndex + (i - 1) == selectedPhotoIndex)}"
          >
            <v-img 
              aspect-ratio="1.25"
              :src="picUrls[basePicIndex + (i - 1)]"
              @click="selectPic(i)"
            />
          </v-col>
          <v-col align="center">
            <v-btn 
              icon
              @click="shiftBasePicIndex(1)"
              :disabled="basePicIndex + 4 == picUrls.length || picUrls.length <= 4"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-card color="#282828" elevation="5">
          <v-card-title :on="account" class="py-0 mt-5">
            <v-col cols="2" class="pa-2">
              <v-img
                max-height="3em"
                max-width="3em"
                style="border-radius: 50%"
                src="https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"
              ></v-img>
            </v-col>
            {{ account }}
            <v-rating
              :value="sell_star"
              color="amber"
              readonly
              dense
              class="ma-3"
              half-increments
              size="25"
            ></v-rating>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="6" class="pa-8">
        <v-card
          v.scroll.self="onScroll"
          max-height="350px"
          class="overflow-y-auto"
        >
          <v-card-title> 商品介紹 </v-card-title>
          <v-card-text style="font-size: 15px">
            {{ discription }}
          </v-card-text>
        </v-card>
        <v-card elevation="0">
          <v-row>
            <v-col cols="3">
              <v-rating
                class="pa-3"
                dense
                :value="star"
                color="amber"
                readonly
                half-increments
                size="25"
              ></v-rating>
            </v-col>
            <v-col
              v-if="is_bidding == true"
              cols="8"
              class="pb-0 font-weight-bold"
              :time="times"
            >
              <v-container class="pl-0 mb-0"
                >距離競標結束還有 {{ times[0].time }} 日
                {{ times[1].time }} 個小時 {{ times[2].time }} 分鐘
                {{ times[3].time }} 秒</v-container
              >
            </v-col>
          </v-row>
        </v-card>
        <!-- 下方是如果是競標才產生的區塊 -->
        <v-container v-if="is_bidding == true" class="pt-0">
          <v-row>
            <v-col cols="3" class="pt-0 pb-0"> 目前最高出價 </v-col>
            <v-col cols="8" class="pt-0 pb-0">
              每標最低金額：NT {{ per_bid_price }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-spacer
                :on="price"
                class="my-0 subtitle-1 cyan--text text--lighten-2 text-h4"
                align-self="center"
              >
                NT {{ formatPrice(the_highest_price) }}
              </v-spacer>
            </v-col>
            <v-col cols="3" class="pr-0">
              <v-spacer></v-spacer>
              <v-text-field
                v-model="customer_price"
                filled
                outlined
                height
                dense
                class="right-input toolbar"
              >
              </v-text-field>
            </v-col>
            <v-col class="pl-0">
              <v-btn
                color="deep-purple lighten-3"
                light
                font-weight-bold
                min-width="90px"
                class="font-weight-bold mr-2"
              >
                出價
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <!-- 到這 -->
        <!-- 下方是一般商品的區塊 -->
        <v-row justify="space-between" v-if="is_bidding == false">
          <v-col offset-md="0">
            <v-spacer
              :on="price"
              class="my-0 subtitle-1 pl-4 cyan--text text--lighten-2 text-h4"
              align-self="center"
            >
              NT {{ formatPrice(price) }}
            </v-spacer>
          </v-col>
          <v-col md="3" offset-md="3">
            <v-spacer></v-spacer>
            <v-text-field
              label="數量"
              v-model="product_num"
              :prepend-inner-icon="mdi_minus"
              :append-icon="mdi_plus"
              @click:prepend-inner="decrement"
              @click:append="increment"
              outlined
              dense
              class="centered-input toolbar"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <!-- 到這 -->
        <v-card-actions v-if="is_bidding == false">
          <v-spacer></v-spacer>
          <v-btn
            color="deep-purple lighten-3"
            light
            font-weight-bold
            class="font-weight-bold mr-2"
          >
            直接購買
          </v-btn>
          <v-btn
            color="deep-purple lighten-3"
            light
            font-weight-bold
            class="font-weight-bold ml-2"
          >
            放入購物車
          </v-btn>
        </v-card-actions>
        <v-card class="pa-2 ma-2" color="#282828">
          <v-card-title><h2 style="font-weight: lighter">評價</h2></v-card-title>
          <v-container>
            <div 
              v-if="this.comments_cmp.length == 0"
              style="text-align: center;"
            >暫無商品評價！</div>
            <c_card
              v-for="item in comments_cmp"
              :key="item.id"
              :url="item.url"
              :buyer="item.buyer"
              :comment_star="item.comment_star"
              :text="item.text"
            ></c_card>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import c_card from "./comment/comment_card.vue";
import { mapActions } from 'vuex'
const API_PREFIX = process.env.VUE_APP_API_PREFIX;

export default {
  components: { c_card },
  computed: {
    errorMsg(){
      if(this.imageNotUploaded) return "賣家似乎沒有上傳圖片:p";
      return "噢不！我們的伺服器上沒有屬於此商品的照片:(";
    },
    errorIcon(){
      if(this.imageNotUploaded) return "mdi-image-off-outline";
      return "mdi-border-none-variant";
    },
    // is_bidding(){ return Boolean(this.is_bidding); },
    endTime(){ return this.bidding_endtime; },
    customer_price(){ return parseInt(this.bidding_price_perbid); },
    per_bid_price(){ return parseInt(this.bidding_price_perbid); },
    the_highest_price(){ return 0; },
    comments_cmp(){ return this.comments; },
  },
  data: () => ({
    sell_star: 3.5,
    merchant_name: "",
    discription:"",
    account: "",
    star: 0,
    price: 9487,
    product_num: 1,
    mdi_minus: "mdi-minus",
    mdi_plus: "mdi-plus",
    is_bidding: false,
    days: 1,
    hours: 0,
    minutes: 21,
    bidding_price: null,
    bidding_price_perbid: null,
    photo: [],
    bidding_endtime: null,
    basePicIndex: 0,
    selectedPhotoIndex: 0,
    isReady: false,
    imageNotUploaded: false,
    imageNotFound: false,
    comments: [],
    // comments: [
    //   {
    //     url:
    //       "https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png",
    //     buyer: "Andy00002",
    //     comment_star: 1.1,
    //     text: "爛死了，我買的物理課本竟然沒有附序號！！！",
    //   },
    //   {
    //     url:
    //       "https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png",
    //     buyer: "321",
    //     comment_star: 4.1,
    //     text: "這買家不錯哦",
    //   },
    // ],
    picUrls:[],
    startTime: "December 16, 2020 12:03:00",
    times: [
      { id: 0, text: "Days", time: 1 },
      { id: 1, text: "Hours", time: 1 },
      { id: 2, text: "Minutes", time: 1 },
      { id: 3, text: "Seconds", time: 1 },
    ],
  }),
  methods: {
    ...mapActions(
      [
        "generateBlob"
      ]
    ),
    formatPrice(value) {
      let val = (value / 1).toFixed(0);
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    decrement() {
      if (this.product_num > 1) this.product_num--;
    },
    increment() {
      this.product_num++;
    },
    updateTimer() {
      if (
        this.times[3].time > 0 ||
        this.times[2].time > 0 ||
        this.times[1].time > 0 ||
        this.times[0].time > 0
      ) {
        this.getTimeRemaining();
        this.updateProgressBar();
      } else {
        clearTimeout(this.timeinterval);
        // this.times[3].time = this.times[2].time = this.times[1].time = this.times[0].time = 0;
        this.progress = 0;
      }
    },
    updateProgressBar() {
      let startTime = Date.parse(new Date(this.startTime));
      let currentTime = Date.parse(new Date());
      let endTime = Date.parse(new Date(this.endTime));
      let interval = parseFloat(
        ((currentTime - startTime) / (endTime - startTime)) * 100
      ).toFixed(2);
      this.progress = 100 - interval;
    },
    getTimeRemaining() {
      let t = Date.parse(new Date(this.endTime)) - Date.parse(new Date());
      if (t >= 0) {
        this.times[3].time = Math.floor((t / 1000) % 60); //seconds
        this.times[2].time = Math.floor((t / 1000 / 60) % 60); //minutes
        this.times[1].time = Math.floor((t / (1000 * 60 * 60)) % 24) - 8; //hours
        this.times[0].time = Math.floor(t / (1000 * 60 * 60 * 24)); //days
      } else {
        this.times[3].time = this.times[2].time = this.times[1].time = this.times[0].time = 0;
        this.progress = 0;
      }
    },
    shiftBasePicIndex(op){
      if(op > 0){ if(this.basePicIndex + 4 < this.picUrls.length) this.basePicIndex += 1; }
      else{ if(this.basePicIndex > 0) this.basePicIndex -= 1; }
    },
    selectPic(i){
      this.selectedPhotoIndex = this.basePicIndex + (i - 1);
      const pel = document.querySelector(`.selected`)
      const pelClass = pel.getAttribute('class');
      const el = document.querySelector(`#pic${i}`)
      const elClass = el.getAttribute('class');
      pel.setAttribute('class', elClass);
      el.setAttribute('class', pelClass);
    },
    async fetchPhotos(photos){
      let photoURLs = [];
      if(this.photo.length == 0) { this.imageNotUploaded = true; this.isReady = true; return; }
      await photos.forEach(async el => { 
        const image = await this.generateBlob(el);
        if(this.photo.length == 1 && image == undefined){ this.imageNotFound = true; this.isReady = true; return;}
        photoURLs.push(image); 
      });
      this.picUrls = photoURLs
      this.isReady = true;
    },
    async fetchMerchant(id){
      const res = await this.$axios.get(
        `${API_PREFIX}/merchant/get?id=${id}`,
      );
      const merchant = res.data.merchant;

      // const keys = Object.keys(merchant);
      // for(let idx in keys){
      //   const key = keys[idx]
      //   this[key] = merchant[key];
      // }
      this.price = merchant.price
      this.photo = merchant.photo || []
      this.merchant_name = merchant.merchant_name
      this.count = merchant.count
      this.discription = merchant.discription
      this.is_bidding = merchant.is_bidding
      this.bidding_price = merchant.bidding_price
      this.bidding_price_perbid = merchant.bidding_price_perbid
      this.bidding_endtime = merchant.bidding_endtime
      this.account = merchant.account
      this.status = merchant.status || ""
      this.comments = merchant.comments || []

      this.updateTimer();
      this.timeinterval = setInterval(this.updateTimer, 1000);
    },
    async init(){
      await this.fetchMerchant(this.$route.params.id);
      await this.fetchPhotos(this.photo);
    }
  },
  async mounted() {
    this.init();
  },
  props:{
    id: String
  }
};
</script>
<style scoped>
.centered-input >>> input {
  text-align: center;
}
.right-input >>> input {
  text-align: right;
}
.toolbar {
  max-width: 140px;
}
.image{ border: 1px solid white; }
.selected{ border: 1px solid green; }
</style>