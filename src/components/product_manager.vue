<template>
  <v-card max-width="60%" class="mx-auto mt-5 pa-6 px-2">
    <v-title>
      <h2 style="font-weight: lighter;" class="px-4">
        賣場商品管理
        <v-btn icon>
          <v-icon large>mdi-briefcase-upload-outline</v-icon>
        </v-btn>
      </h2>
    </v-title>
    <v-tabs
      v-model="tab"
      align-with-title
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in itemss"
          :key="item"
        >
          <v-card
            elevation="14"
            tile
            class="mx-10"
            max-width="1070"
            color="#282828"
          >
            <v-card-text>
              <v-divider></v-divider>
              <v-subheader>
                <v-row>
                  <v-col cols="4">
                  商品
                  </v-col>
                  <v-col cols="2" align="center">
                  庫存
                  </v-col>
                  <v-col cols="2" align="center">
                  單價
                  </v-col>
                  <v-col cols="4" align="center">
                    操作
                  </v-col>
                </v-row>
              </v-subheader>
              <v-divider></v-divider>
              <v-row>
                <v-col
                  v-for="(n,index) in item"
                  :key="n"
                  cols=12
                  class="py-0"
                >
                  <managerbar
                    :key="n"
                    :price=n.price
                    :stock=n.stock
                    @return_delete="_delete(item,index)"
                  ></managerbar>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>


  </v-card>
</template>
<script>
  // import manager_card from "./pro_manager/manager_card.vue";
  import managerbar from "./pro_manager/manager_bar.vue"
  export default {
    // components: { manager_card },
    components: { managerbar, },
    data:()=>({
      tab:null,
      items:[
        '已上架商品','未上架','已售完'
      ],
      itemss:[
        [{stock:2,price:2424},
        {stock:3,price:2525},
        {stock:4,price:2125},
        ],
        [{stock:5,price:2121},
        {stock:6,price:2323},],
        [{stock:8,price:224},]
      ]
    }),
    props:{
      store: {
        name: String,
        merchant_id: [Number],
      }
    },
    methods:{
      _delete(array,index){
        console.log(index)
        array.splice(index,1)
      }
    }
  }
</script>