<template>
  <v-card
      class="mx-auto mt-5 pa-10"
      min-width="80%"
      max-width="90%"
  >
    <v-card-title v-model="name" >
        <h2>{{name}}</h2>
    </v-card-title>
    <v-row>
      <v-col
        cols=6
        class="pa-10"
      >
        <v-card
          color="grey darken-3"
        >
          <v-img
            src="https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"
            max-height="25em"
            contain
          ></v-img>
        </v-card>
        <v-row>
          <v-col 
            cols=3
            v-for="item in items"
            :key="item"
          >
            <v-img v-bind:src="item.url"
            ></v-img>
          </v-col>
        </v-row>
        <v-card color="#282828" elevation="5">
          <v-card-title :on="seller" class="py-0 mt-5">
            <v-col cols=2 class="pa-2">
              <v-img
                max-height="3em"
                max-width="3em"
                style="border-radius: 50%; "
                src="https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"
              ></v-img>
            </v-col>
            {{seller}}
            <v-rating
              :value=sell_star
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
      <v-col
        cols=6
        class="pa-8"
      >
        <v-card  
            v.scroll.self="onScroll"
            max-height="350px"
            class="overflow-y-auto"
        >
            <v-card-title>
                商品介紹
            </v-card-title>
            <v-card-text :on="intro" style="font-size:15px;">
                {{intro}}
            </v-card-text>
        </v-card>
        <v-card elevation="0">
          <v-row >
            <v-col cols="3">
              <v-rating
              class="pa-3"
              dense
              :value=item_star
              color="amber"
              readonly
              half-increments
              size="25"
              ></v-rating>
            </v-col>
            <v-col v-if="bidding===true" cols="8" class="pb-0 font-weight-bold" :time="times">
              <v-container class="pl-0 mb-0" >距離競標結束還有 {{times[0].time}} 日 {{times[1].time}} 個小時 {{times[2].time}} 分鐘 {{times[3].time}} 秒</v-container>
            </v-col>
          </v-row>
        </v-card>
        <!-- 下方是如果是競標才產生的區塊 -->
        <v-container v-if="bidding===true" class="pt-0">
          <v-row>
            <v-col cols="3" class="pt-0 pb-0">
              目前最高出價
            </v-col>
            <v-col cols="8" class="pt-0 pb-0">
              每標最低金額：NT {{per_bid_price}}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-spacer
                :on="price" 
                class="my-0 subtitle-1 cyan--text text--lighten-2 text-h4"
                :align-self="center"
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
        <v-row justify="space-between" v-if="bidding===false">
          <v-col offset-md="0">
            <v-spacer
              :on="price" 
              class="my-0 subtitle-1  pl-4 cyan--text text--lighten-2 text-h4"
              :align-self="center"
            >
              NT {{ formatPrice(price) }} 
            </v-spacer>
          </v-col>
          <v-col   md="3" offset-md="3">
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
        <v-card-actions v-if="bidding===false">
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
            <v-title><h2 style="font-weight:lighter">評價</h2></v-title>
            <v-container>
              <c_card
                v-for="item in comments"
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
    import c_card from "./comment/comment_card.vue"
    export default{
      components: { c_card, },
      data:()=>({
        sell_star:3.5,
        name:'商品名稱',
        intro:"普希金曾經提過，人的影響短暫而微弱，書的影響則廣泛而深遠。這啟發了我。總結來說，巴爾扎克曾講過，他作為銀錢老虎，每天可以用投機這門大砲瞄準一筆財產，他作為男人，卻要聽從幸福的擺佈。這不禁令我重新仔細的思考。每個人的一生中，幾乎可說碰到商品介紹這件事，是必然會發生的。阿拉伯在過去曾經講過，斃虎者飽餐虎肉，畏虎者葬身虎口。這句話看似簡單，卻埋藏了深遠的意義。不要先入為主覺得商品介紹很複雜，實際上，商品介紹可能比你想的還要更複雜。孔子說過，君子之道四焉，強於行義，弱於受諫，怵於待祿，慎於治身。",
        seller:'Rabbit',
        item_star:'4.6',
        price:9487,
        product_num:1,
        mdi_minus:'mdi-minus',
        mdi_plus:'mdi-plus',
        bidding:true,
        days:1,
        hours:0,
        minutes:21,
        per_bid_price:100,
        customer_price:100,
        the_highest_price:8487,
        items:[
          {url:"https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"},
          {url:"https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"},
          {url:"https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"},
          {url:"https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"}
        ],
        comments:[
          {
            url:"https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png",
            buyer:"Andy00002",
            comment_star:"1.1",
            text:"爛死了，我買的物理課本竟然沒有附序號！！！"
          },
          {
            url:"https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png",
            buyer:"321",
            comment_star:"4.1",
            text:"這買家不錯哦"
          }
        ],
        startTime: "December 16, 2020 12:03:00",
        endTime: "December 17, 2020 12:05:00",
        times: [
          { id: 0, text: "Days", time: 1 },
          { id: 1, text: "Hours", time: 1 },
          { id: 2, text: "Minutes", time: 1 },
          { id: 3, text: "Seconds", time: 1 }
        ],
      }),
      methods: {
        formatPrice(value) {
          let val = (value/1).toFixed(0)
          return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        decrement(){
          if(this.product_num>1)
            this.product_num--
        },
        increment(){
          this.product_num++
        },
        updateTimer(){
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
            (currentTime - startTime) / (endTime - startTime) * 100
          ).toFixed(2);
          this.progress = 100-interval;
        },
        getTimeRemaining() {
          let t = Date.parse(new Date(this.endTime)) - Date.parse(new Date());
        if(t >= 0){
          this.times[3].time = Math.floor(t / 1000 % 60); //seconds
          this.times[2].time = Math.floor(t / 1000 / 60 % 60); //minutes
          this.times[1].time = Math.floor(t / (1000 * 60 * 60) % 24); //hours
          this.times[0].time = Math.floor(t / (1000 * 60 * 60 * 24)); //days
          }else {
            this.times[3].time = this.times[2].time = this.times[1].time = this.times[0].time = 0;
            this.progress = 0;
          }
        },
      },
      created() {
        this.updateTimer();
        this.timeinterval = setInterval(this.updateTimer, 1000);
      },
      // props:{
      //   bidding:Boolean,
      //   remaining_time:{
      //     days: Number,
      //     hours:Number,
      //     minutes:Number,
      //   },
      //   per_bid_price:Number,
      //   the_highest_price:Number
      // }
    }
</script>
<style scoped>
    .centered-input >>> input{
      text-align: center;
    }
    .right-input >>> input{
      text-align: right;
    }
    .toolbar {
      max-width: 140px;
    }
</style>