<template>
  <div class="text-center">
    <v-btn
      color="blue"
      dark
      @click="sheet = !sheet"
    >
      Search bar
    </v-btn>
    <v-bottom-sheet v-model="sheet">
      <v-sheet
        class=""
        height="200px"
      >
        <v-card max-width="1400" class="mx-auto" elevation="1">

        
        <v-container class="pt-0">
          <v-row>
            <v-col cols=10><h3 class="font-weight-medium">進階搜索</h3></v-col>
          </v-row>
          <v-row class="mx-10">
            <v-col cols="2" class="pt-0">
              <v-row>
                <v-col cols="12">
                  評價
                </v-col>
                <div class="mx-3">
                  <v-rating 
                    v-model="rating"
                    dense
                  ></v-rating></div>
                <span>以上</span>
              </v-row>
            </v-col>
            <v-col cols="2" class="pt-0">
              <v-row>
                <v-col cols="12">交易類型</v-col>
                <v-col cols="6" class="pt-0">
                  <v-checkbox
                    label="一般"
                    class="mt-0"
                    v-model="general"
                  ></v-checkbox>
                </v-col>
                <v-col cols="6" class="pt-0">
                  <v-checkbox
                    label="競標"
                    class="mt-0"
                    v-model="bidding"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="3" class="pt-0">
              <v-row>
                <v-col cols="12">商品價位</v-col>
                <v-col cols="5" class="pt-0" >
                  <v-text-field 
                    outlined 
                    v-model="low_price" 
                    class="mt-0" 
                    placeholder="最低價"></v-text-field>
                </v-col>
                <v-col cols="2">
                  ～
                </v-col>
                <v-col cols="5" class="pt-0">
                  <v-text-field 
                    outlined 
                    v-model="high_price" 
                    class="mt-0" 
                    placeholder="最高價"></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="2" class="pt-0">
              <v-row>
                <v-col cols="12">商品狀況</v-col>
                <v-col cols="6" class="pt-0">
                  <v-checkbox
                    label="全新"
                    v-model="all_new"
                    class="mt-0"
                  ></v-checkbox>
                </v-col>
                <v-col cols="6" class="pt-0">
                  <v-checkbox
                    label="二手"
                    v-model="old"
                    class="mt-0"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="3">
              <v-row>
                <v-col cols="12"></v-col>
                <v-col>
                  <v-btn
                    color="deep-purple lighten-3"
                    light
                    font-weight-black
                    :prepend-inner-icon="mdi_minus"
                    width="100px"
                  ><v-icon>mdi-magnify</v-icon>搜索</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        </v-card>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
  export default {
    data:()=>({
      sheet:false,
      rating:0,
      general:false,
      bidding:false,
      low_price:'',
      high_price:'',
      all_new:false,
      old:false
    }),
    props:{

    }
  }
</script>
<style>
  .v-text-field .v-input__control .v-input__slot {
    min-height: auto !important;
    display: flex !important;
    align-items: center !important;
  }
</style>