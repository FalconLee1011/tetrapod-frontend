<template>
  <v-card
    class="mx-auto mt-5"
    max-width="70%"
  >
    <v-card-title>
      訂單追蹤
      <v-spacer />
      <v-btn @click="$router.push('/order-tracking')" outlined><v-icon small>mdi-undo-variant</v-icon>返回訂單列表</v-btn>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols=5>
          <v-card elevation=0>
            <v-card-subtitle>與 {{seller}} 的訂單</v-card-subtitle>
              <v-timeline>
                <v-timeline-item 
                  v-for="(state, idx) in timelineStatus"
                  :key="idx"
                  large
                  style="margin: 1rem 0;"
                  v-bind:class="((Object.keys(timelineStatus).indexOf(idx.toString()) + 1) % 2 == 0) ? ['text-right', 'align-right'] : ''"
                  v-bind:color="(!state.status) ? 'grey darken-2' : (timelineStatus[idx + 1]) ? (timelineStatus[idx + 1].status) ? 'indigo darken-2' : 'primary' : 'primary'"
                >
                  <div
                    v-bind:class="(state.status) ? 'done' : 'not-done'"
                  >
                    <div>
                      {{state.timestamp}}
                    </div>
                    <div>
                      {{state.statusName}}
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
                :items="items"
                > 
                  <template v-slot:item.price="{item}">
                    NT {{item.price.toLocaleString()}}
                  </template>
                  <template v-slot:item.rating="{item}">
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
                  </template>
                </v-data-table>
                <v-card-actions>
                  <v-spacer />
                  <v-btn :disabled="!orderIsDone" color="primary">新增圖片或文字</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row style="height: 20%">
            <v-col>
              <v-card elevation=0>
                <v-card-title><v-spacer />
                  <span style="font-size: 200%;">NT {{price.toLocaleString()}}</span>
                </v-card-title>
                <v-card-actions>
                  <v-spacer />
                  <v-btn :disabled="!orderIsDone" color="primary">完成訂單</v-btn>
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
export default {
  props:{
    seller:{
      type: String,
      default: "吉娃娃商店"
    }
  },
  data() {
    return {
      price: 9876,
      orderIsDone: false,
      timelineStatus:[
        {statusName: "訂單送出", status: true, timestamp: "2020/10/21"},
        {statusName: "賣家已接到訂單", status: true, timestamp: "2020/10/21"},
        {statusName: "賣家寄出商品", status: false, timestamp: " "},
        {statusName: "商品抵達取貨門市", status: false, timestamp: " "},
        {statusName: "完成取貨", status: false, timestamp: " "},
        {statusName: "完成互相評價", status: false, timestamp: " "},
      ],
      headers:[
        {text: "", value: "merchant"},
        {text: "數量", value: "quantity"},
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
  },
  
}
</script>