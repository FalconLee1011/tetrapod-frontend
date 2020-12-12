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
          <manager_card class="px-0" :quantity="item"></manager_card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>


  </v-card>
</template>
<script>
  import manager_card from "./pro_manager/manager_card.vue";
  export default {
    components: { manager_card },
    data:()=>({
      tab:null,
      items:[
        '已上架商品','未上架','已售完'
      ],
      itemss:[2,1,4]
    }),
    props:{
      store: {
        name: String,
        merchant_id: [Number],
      }
    }
  }
</script>