<template>
  <div>
    <v-card
      class="mx-auto mt-5"
      elevation="30"
      min-width="90%"
      max-width="95%"
      tile
      style="background-color: #323232"
    >
      <v-card-text>
        <v-row>
          <v-col cols="1">
            <v-avatar color="primary" size="100">
              <img v-if="marketProfile" :src="marketProfile">
              <img
                v-else
                src="https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"
              />
            </v-avatar>
          </v-col>
          <v-col cols="2">
            <span style="font-size: 150%; padding: 12px">{{ marketname }}</span
            ><br />
            <v-rating
              class="pa-3"
              dense
              :value="market_star"
              color="amber"
              readonly
              half-increments
              size="20"
            ></v-rating>
            ({{market_star_count}})
          </v-col>
          <v-col cols="1">
            <v-spacer></v-spacer><br />
            <v-btn
              icon
              x-large
              @click="openChat"
            >
              <v-icon size="40">
                mdi-message-text-outline
              </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="8">
            <div style="overflow: scroll; height: 100px">
              {{ message }}
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mx-auto" elevation="3" tile min-width="90%" max-width="95%">
      <v-card-text>
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
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import mCard from "./merchant/merchant-card.vue";
import { mapActions } from 'vuex';
const API_PREFIX = process.env.VUE_APP_API_PREFIX;

export default {
  name: "market",
  components: { mCard },
  data(){
    return{
      items: [],
      marketname: "",
        // "李記小草肉",
      market_star: 3,
      market_star_count: 3,
      message: "",
      marketProfile: undefined,
        // "好吃的小草肉一斤兩百六，便宜賣，限時限量要搶要快。由於，如果仔細思考小草肉，會發現其中蘊含的深遠意義。我們都有個共識，若問題很困難，那就勢必不好解決。小草肉可以說是有著成為常識的趨勢。這是不可避免的。對於一般人來說，小草肉究竟象徵著什麼呢？做好小草肉這件事，可以說已經成為了全民運動。其實，若思緒夠清晰，那麼小草肉也就不那麼複雜了。孔子曾經提過，君子之道四焉，強於行義，弱於受諫，怵於待祿，慎於治身。這句話看似簡單，但其中的陰鬱不禁讓人深思。我們都很清楚，這是個嚴謹的議題。俗話說的好，掌握思考過程，也就掌握了小草肉。本人也是經過了深思熟慮，在每個日日夜夜思考這個問題。想必大家都能了解小草肉的重要性。世界上若沒有小草肉，對於人類的改變可想而知。一般來說，了解清楚小草肉到底是一種怎麼樣的存在，是解決一切問題的關鍵。小草肉的出現，必將帶領人類走向更高的巔峰。",
      // item: [
      //   {
      //     url:
      //       "https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png",
      //     title: "小草肉",
      //     uploader: "李記小草肉",
      //     text: "要買要快，品質保證",
      //     price: 250,
      //   },
      //   {},
      // ],
    }
  },
  props: {
    id: String,
  },
  methods: {
    ...mapActions( [ "generateBlob" ] ),
    async fetchAccount(){
      const res = await this.$axios.post(
        `${API_PREFIX}/accounts/get`,
        {
          account: this.$route.params.account
        }
      )
      const account = res.data.account
      this.account = account
      this.marketname = account.nick_name || account.account
      this.message = account.market_discription || "摁、看來是個安靜的人在賣東西。"
      this.marketProfile = await this.generateBlob(account.account_avator);
      this.market_star = account.star.star
      this.market_star_count = account.star.count
      this.fetchMerchant();
    },
    async fetchMerchant(){
      const res = await this.$axios.post(
        `${API_PREFIX}/merchant/get`,
        {
          query:{
            account: this.$route.params.account
          }
        }
      )
      this.items = res.data.merchants;
    },
    async openChat(){
      if(this.$store.getters.authPassed){
        console.log("openChat");
        this.$emit("openChat", {"to": this.account.account})
      }else{
        this.$swal({
          icon: "error",
          title: "請先登入！"
        })
      }
    }
  },
  mounted() {
    this.fetchAccount()
    // console.log("MOUNTED!");
  },
};
</script>
