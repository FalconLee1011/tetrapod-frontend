<template>
  <div class="text-center">
    <v-btn
      elevation="0"
      @click="sheet = !sheet"
      small
    >
      <v-icon small>mdi-filter-menu-outline</v-icon>
      進階搜尋
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
                    v-model="requirement.isGeneral"
                  ></v-checkbox>
                </v-col>
                <v-col cols="6" class="pt-0">
                  <v-checkbox
                    label="競標"
                    class="mt-0"
                    v-model="requirement.isBidding"
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
                    v-model="requirement.minPrice" 
                    class="mt-0" 
                    placeholder="最低價"></v-text-field>
                </v-col>
                <v-col cols="2">
                  ～
                </v-col>
                <v-col cols="5" class="pt-0">
                  <v-text-field 
                    outlined 
                    v-model="requirement.maxPrice" 
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
                    v-model="requirement.isNew"
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
    props:{
      requirement:{
        type: Object,
        default: () => {
          return {
            rating: undefined, 
            isGeneral: undefined, 
            isBidding: undefined, 
            minPrice: undefined, 
            maxPrice: undefined, 
            isNew: undefined, 
            old: undefined, 
          }
        }
      }
    },
    data:()=>({
      sheet:false,
    }),
    computed:{},
    methods:{
      return_requirement:function(){
        this.$emit("setAdvReq",this.requirement);
        this.sheet = false;
      },
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