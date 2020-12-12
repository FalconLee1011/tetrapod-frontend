<template>
  <v-card max-width="50%" class="mx-auto mt-5" color="#282828">
    <v-card-title style="font-weight:lighter">
      <h3>上傳商品</h3>
    </v-card-title>
    <v-container class="mt-8 px-15">
      <v-row>
        <r-col cols="3" class="px-2">
          <p>交易類型</p>
          <v-radio-group
            v-model="bidding_or_not"
            row
          >
            <v-radio
              label="一般"
              value="false"
            ></v-radio>
            <v-radio
              label="競標"
              value="true"
            ></v-radio>
          </v-radio-group>
        </r-col>
        <r-col cols="3" class="px-2">
          <p>商品狀態</p>
          <v-radio-group
            v-model="new_or_not"
            row
          >
            <v-radio
              label="全新"
              value="all_new"
            ></v-radio>
            <v-radio
              label="二手"
              value="old"
            ></v-radio>
          </v-radio-group>
        </r-col>
      </v-row>
      <v-row>
        <v-col cols='4'>
          <v-text-field filled label="商品名稱" v-model="name">
            
          </v-text-field>
        </v-col>
        <v-col cols='4'>
          <v-text-field filled label="商品價格" v-model="price">
        
          </v-text-field>
        </v-col>
        <v-col cols='4'>
          <v-text-field filled label="庫存數量" v-model="quantity">
            
          </v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="bidding_or_not==='true'">
        <v-col cols='3'>
          <v-text-field filled label="起標金額" v-model="name">
            
          </v-text-field>
        </v-col>
        <v-col cols='3'>
          <v-text-field filled label="每標最低出價" v-model="price">
        
          </v-text-field>
        </v-col>
        <v-col cols='3'>
          <v-text-field filled label="最高價" v-model="quantity">
            
          </v-text-field>
        </v-col>
        <v-col cols='3'>
          <v-text-field filled label="期限" v-model="quantity">
            
          </v-text-field>
        </v-col>
      </v-row>
      <v-textarea 
        filled 
        label="商品簡介" 
        v-model="intro"
        maxlength="300"
        counter
      >
      </v-textarea>
      <v-file-input
        label="上傳商品圖片"
        filled
        hint="至少一頁"
        persistent-hint
        append-icon=""
        @change="previewImage"
      >
      </v-file-input>
      <p style="font-size: 15px;">圖片預覽</p>
      <v-row no-gutters>
        <v-col cols="2" v-for="item in preview_img" class="pr-2" :key="item.id">
          <v-img :src="item.src" max-height="120px" max-width="120px"></v-img>
        </v-col>
      </v-row>
      
      <v-card-actions class="px-0 py-3">
        <v-spacer></v-spacer>
        <v-btn
          color="red lighten-2"
          light
          font-weight-bold
          @click="dialog = false"
          class="font-weight-bold"
        >
          取消
        </v-btn>
        <v-btn
          color="deep-purple lighten-3"
          light
          width="100px"
          font-weight-bold
          @click="dialog = false"
          class="font-weight-bold"
        >
          上傳商品
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>
<script>
  //import 'viewerjs/dist/viewer.css'
  export default{
    data(){
      return{
        name:'',
        price:'',
        quantity:'',
        intro:'',
        image:'',
        bidding_or_not:null,
        new_or_not:null,
        pic_size:'80px',
        preview_img:[
          {
            src:"https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png",
          },
          {
            src:"https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png",
          }
        ]
      }
    },
  }
</script>
<style>

</style>