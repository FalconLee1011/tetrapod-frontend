<template>
  <div class="text-center">
    <v-btn
      color="grey darken-2"
      elevation="0"
      dark
      @click="sheet = !sheet"
    >
      進階搜索
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
            <v-col cols="3" class="pt-0">
              <v-row>
                <v-col cols="12">
                  評價
                </v-col>
                <div class="mx-3">
                  <v-rating 
                    v-model="requirement.rating"
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
                    v-model="requirement.general"
                  ></v-checkbox>
                </v-col>
                <v-col cols="6" class="pt-0">
                  <v-checkbox
                    label="競標"
                    class="mt-0"
                    v-model="requirement.bidding"
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
                    v-model="requirement.low_price" 
                    class="mt-0" 
                    placeholder="最低價"></v-text-field>
                </v-col>
                <v-col cols="2">
                  ～
                </v-col>
                <v-col cols="5" class="pt-0">
                  <v-text-field 
                    outlined 
                    v-model="requirement.high_price" 
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
                    v-model="requirement.all_new"
                    class="mt-0"
                  ></v-checkbox>
                </v-col>
                <v-col cols="6" class="pt-0">
                  <v-checkbox
                    label="二手"
                    v-model="requirement.old"
                    class="mt-0"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="2">
              <v-row>
                <v-col cols="12"></v-col>
                <v-col>
                  <v-btn
                    color="deep-purple lighten-3"
                    light
                    font-weight-black
                    width="100px"
                    @click="return_requirement()"
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
      requirement:{
        rating:0,
        general:false,
        bidding:false,
        bidding_or_not:null,
        low_price:null,
        high_price:null,
        all_new:false,
        old:false,
        new_or_not:null,
      }
    }),
    computed:{
 
    },
    methods:{
      return_requirement:function(){
        this.price();
        this.new_or_not();
        this.bidding();
        this.$emit("return_requirement",this.requirement);
        this.sheet = false;
      },
      new_or_not:function(){
        if(this.requirement.all_new === this.requirement.old)
          this.requirement.new_or_not = "";
        else if(this.requirement.all_new === true)
          this.requirement.new_or_not = "old";
        else
          this.requirement.new_or_not = "all_new";
      },
      price:function(){
        this.requirement.low_price = parseInt(this.requirement.low_price)
        this.requirement.high_price = parseInt(this.requirement.high_price)
      },
      bidding:function(){
        if(this.requirement.bidding === this.requirement.general)
          this.requirement.bidding = "";
        else if(this.requirement.bidding === true)
          this.requirement.bidding_or_not = false;
        else
          this.requirement.bidding_or_not = true;
      }
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