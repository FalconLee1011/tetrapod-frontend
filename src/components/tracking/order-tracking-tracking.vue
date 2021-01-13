<template>
  <v-card
    class="mx-auto mt-5"
    max-width="70%"
  >
    <comment 
      :headers=headers
      :merchants=order.merchants
      ref="comment"
      v-on:rate="rate($event)"
    />
    <v-card-title>
      訂單追蹤
      <v-spacer v-if="(order.status[order.cState].status == 'canceled')" />
      <span style="color: red;" v-if="(order.status[order.cState].status == 'canceled')">
        訂單已取消
      </span>
      <v-spacer />
      <v-btn @click="$router.push('/order-tracking')" outlined><v-icon small>mdi-undo-variant</v-icon>返回訂單列表</v-btn>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols=5>
          <v-card elevation=0>
            <v-card-subtitle>與 {{this.order.market}} 的訂單</v-card-subtitle>
              <v-timeline>
                <v-timeline-item 
                  v-for="(state, idx) in order.status"
                  :key="idx"
                  large
                  style="margin: 1rem 0;"
                  v-bind:class="((Object.keys(order.status).indexOf(idx.toString()) + 1) % 2 == 0) ? ['text-right', 'align-right'] : ''"
                  v-bind:color="(state.status == 'canceled') ? 'red darken-2' : (!state.is_done) ? 'grey darken-2' : (order.status[idx + 1]) ? (order.status[idx + 1].is_done) ? 'indigo darken-2' : 'primary' : 'primary'"
                >
                  <div
                    v-bind:class="(state.is_done) ? 'done' : 'not-done'"
                  >
                    <div>
                      {{epochConverter(state.timestamp)}}
                    </div>
                    <div>
                      {{status2Zh[state.status]}}
                    </div>
                  </div>
                </v-timeline-item>
              </v-timeline>
          </v-card>
        </v-col>
        <v-col cols=7>
          <v-row style="height: 80%">
            <v-col>
              <v-card elevation=0>
                <v-card-subtitle>訂單內容</v-card-subtitle>
                <v-data-table
                :headers="headers"
                :items="order.merchants"
                > 
                  <template v-slot:item.price="{item}">
                    NT {{item.price.toLocaleString()}}
                  </template>
                  <!-- <template v-slot:item.rating="{item}">
                    <v-rating
                      v-model="comments[items.indexOf(item)].rating"
                      :readonly="!orderIsDone"
                      :color="(!orderIsDone) ? 'grey' : 'primary'"
                      :background-color="(!orderIsDone) ? 'grey' : 'white'"
                      empty-icon="mdi-star-outline"
                      full-icon="mdi-star"
                      half-icon="mdi-star-half-full"
                      half-increments
                    />
                  </template> -->
                </v-data-table>
                <v-card-actions>
                  <v-spacer />
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row style="height: 20%">
            <v-col>
              <v-card elevation=0>
                <v-card-title><v-spacer />
                  <span style="font-size: 200%;">NT {{order.price.toLocaleString()}}</span>
                </v-card-title>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="doneGatering" :disabled="!orderIsReadyToBeDone" color="primary">確認收貨</v-btn>
                  <!-- <v-btn :disabled="!orderIsDone" color="primary">完成訂單</v-btn> -->
                  <v-btn @click="$refs['comment'].interact()" :disabled="!orderIsDone" color="primary">{{rateHint}}</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
  .align-right{ text-align: right; }
  .done, .not-done {
    font-size: 110%;
    font-weight: 500;
  }
  .done{ color: white }
  .not-done { color: #666 }
</style>

<script>
import comment from './comment';
const API_PREFIX = process.env.VUE_APP_API_PREFIX;

export default {
  components: { comment }, 
  data() {
    return {
      price: 9876,
      rateHint: "填寫評價", 
      hasFilledRate: false, 
      rating: {}, 
      order:{
        approve: false,
        buyer: "",
        market: "",
        merchants: [],
        price: 0,
        shipment_method: "",
        status: [],
        cState: 0,
      },
      status2Zh: {
        "newed": "訂單成立", 
        "confirmed": "賣家已承認訂單", 
        "contacted": "買賣方已聯繫", 
        "shipping": "運送中", 
        "doneShipping": "完成運送", 
        "doneGatering": "完成取貨", 
        "canceled": "訂單已取消", 
      }, 
      timelineStatus:[
        {statusName: "訂單送出", status: true, timestamp: "2020/10/21"},
        {statusName: "賣家已接到訂單", status: true, timestamp: "2020/10/21"},
        {statusName: "賣家寄出商品", status: false, timestamp: " "},
        {statusName: "商品抵達取貨門市", status: false, timestamp: " "},
        {statusName: "完成取貨", status: false, timestamp: " "},
        {statusName: "完成互相評價", status: false, timestamp: " "},
      ],
      headers:[
        {text: "", value: "merchant_name"},
        {text: "數量", value: "merchant_count"},
        {text: "金額", value: "price"},
        {text: "評價", value: "rating"},
      ],
      items: [
        {
          merchant: "商品1",
          quantity: 1,
          price: 4938,
        },
        {
          merchant: "商品2",
          quantity: 1,
          price: 4938,
        }
      ],
      comments:[
        {rating: 0},
        {rating: 0},
      ]
    }
  },
  mounted() {
    this.fetchOrder();
  },
  computed: {
    orderIsDone(){
      if(this.order.status[this.order.cState])
        return this.order.status[this.order.cState].status == "doneGatering";
      return false;
    },
    orderIsReadyToBeDone(){
      if(this.order.status[this.order.cState])
        return this.order.status[this.order.cState].status == "doneShipping";
      return false;
    },
  },
  methods: {
    rate(rating){
      this.rating = rating;
      this.rateHint = "送出評價 並 完成訂單";
      this.hasFilledRate = true;
      this.$swal.fire({
        title: '您已完成填寫評價，但是尚未送出，請問要送出您的評價嗎？',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: `送出`,
        denyButtonText: `先不要`,
      }).then(async (res) => {
        if(res.isConfirmed){ this.submitRating(); }
      });
    },
    async submitRating(){
      let ratingToSubmit = {};
      ratingToSubmit.order = this.rating.overallstar;
      ratingToSubmit.merchants = [];
      for (const key in this.rating.merchants) {
        const merchComment = this.rating.merchants[key];
        ratingToSubmit.merchants.push({
          merchantID: key, 
          star: merchComment.star, 
          comments: merchComment.comments
        })
      }

      console.log(ratingToSubmit);
      // this.orderIsDone = false;

      this.$emit("loading");
      const res = await this.$axios.post(
        `${API_PREFIX}/merchant/order/star`, 
        ratingToSubmit, 
        {
          headers: {
            token: this.$store.getters.token
          }
        },
      );
      console.log(res);
      this.$emit("doneloading");
    }, 
    async fetchOrder(){
      const res = await this.$axios.post(
        `${API_PREFIX}/merchant/order/get-orders/buyer`,
        {
          orderID: this.$route.params.id
        },
        {
          headers: {
            token: this.$store.getters.token
          }
        },
      );
      this.order = res.data.order[0];
      console.log(this.order);
    },
    async doneGatering(){
      this.$swal.fire({
        title: '確認更改訂單狀態為 \'已取貨\' ？ ',
        text: `請確認您已收到商品，按下確認後，將進入評價階段。`,
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: `確認`,
        denyButtonText: `取消`,
      }).then(async (res) => {
        if(res.isConfirmed){
          this.$emit("loading");
          const id = this.$route.params.id
          const res = await this.$axios.post(
            `${API_PREFIX}/merchant/order/update-order`,
            {
              orderID: id,
              action: "doneGatering",
            },
            {
              headers: {
                token: this.$store.getters.token
              }
            },
          );
          console.log(res);
          this.$emit("doneloading");
        }
      });
    },
    epochConverter(epoch) {
      let date = new Date(0);
      if(epoch <= 0) return "";
      date.setUTCSeconds(epoch);
      const year = date.getFullYear();
      const month = ("0" + date.getMonth() + 1).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      // const seconds = date.getSeconds();
      return `${year}/${month}/${day} ${hours}:${minutes}`;
    },
  },
  
}
</script>