<template>
  <v-card max-width="50%" class="mx-auto mt-5 mb-5" color="#282828">
    <v-overlay
      :value="isUploading"
      opacity=0.75
    >
      <v-progress-circular
        class="mx-10"
        indeterminate
        color="primary"
        size="150"
        width="5"
      >正在修改商品...</v-progress-circular>
    </v-overlay>
    <v-card-title style="font-weight:lighter">
      <h3>修改商品</h3>
    </v-card-title>
    <v-container class="mt-8 px-15">
      <v-row>
        <v-col cols="6" sm="4" class="px-2">
          <p>交易類型</p>
          <v-radio-group
            v-model="bidding_or_not"
            row
            disabled
          >
            <v-radio
              label="一般"
              :value="false"
            ></v-radio>
            <v-radio
              label="競標"
              :value="true"
            ></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="6" sm="4" class="px-2">
          <p>商品狀態</p>
          <v-radio-group
            v-model="new_or_not"
            row
          >
            <v-radio
              label="全新"
              :value="true"
            ></v-radio>
            <v-radio
              label="二手"
              :value="false"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols='4'>
          <v-text-field filled label="商品名稱" v-model="name">
            
          </v-text-field>
        </v-col>
        <v-col cols='4'>
          <v-text-field filled label="商品價格" v-model="price" :disabled="disable_edit">
        
          </v-text-field>
        </v-col>
        <v-col cols='4'>
          <v-text-field filled label="庫存數量" v-model="quantity">
            
          </v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="bidding_or_not">
        <v-col cols='3'>
          <v-text-field filled label="每標最低出價" v-model="bidding_price_perbid" :disabled="disable_edit">
          </v-text-field>
        </v-col>
        <v-col cols='3'>
          <v-text-field filled label="最高價" v-model="bidding_price" :disabled="disable_edit">
          </v-text-field>
        </v-col>
        <v-col cols='3'>
          <!-- <v-text-field filled label="期限" v-model="bidding_endtime"> -->
          <!-- </v-text-field> -->
          <v-menu
            v-model="showDatetimePicker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="bidding_endtime"
                label="競標截止日"
                readonly
                v-bind="attrs"
                :disabled="disable_edit"
                v-on="on"
                filled
              ></v-text-field>
            </template>
            <v-card>
              <v-date-picker
                v-model="bidding_endtime"
              ></v-date-picker>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="showDatetimePicker = false">完成</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-col>
        <v-col cols='3'>
          <!-- <v-text-field filled label="期限" v-model="bidding_endtime"> -->
          <!-- </v-text-field> -->
          <v-menu
            v-model="showTimePicker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="bidding_endtime_time"
                label="競標截止時間"
                :disabled="disable_edit"
                readonly
                v-bind="attrs"
                v-on="on"
                filled
              ></v-text-field>
            </template>
            <v-card>
              <v-time-picker
                v-model="bidding_endtime_time"
              ></v-time-picker>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="showTimePicker = false">完成</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-col>
      </v-row>
      <v-textarea 
        filled 
        label="商品簡介" 
        v-model="intro"
        maxlength="300"
        counter
        height="5rem"
      >
      </v-textarea>
      <div class="file-preview-zone">
        <FilePond 
          ref="uploader"
          name="pictures"
          :label-idle="pondHint"
          :allow-multiple="true"
          instantUpload="false"
          v-on:updatefiles="handleFileDrop"
        />
      </div>
      
      <v-card-actions class="px-0 py-3">
        <v-spacer></v-spacer>
        <v-btn
          color="red lighten-2"
          light
          font-weight-bold
          @click="$router.go(-1)"
          class="font-weight-bold"
        >
          取消
        </v-btn>
        <v-btn
          color="deep-purple lighten-3"
          light
          width="100px"
          font-weight-bold
          @click="edit"
          class="font-weight-bold"
        >
          修改商品
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<style scpoed>
  /* .filepond--root, */
  /* .filepond--root .filepond--drop-label {
    height: 0px;
  } */
  .file-preview-zone{
    height: 30vh;
    overflow-y: scroll;
  }
  .file-preview-zone::-webkit-scrollbar { display: none; }
</style>

<script>
import vueFilePond from 'vue-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

const API_PREFIX = process.env.VUE_APP_API_PREFIX;

const FilePond = vueFilePond(
  FilePondPluginImagePreview
);

export default {
  components: { FilePond },
  data(){
    return{
      origin_item:[],
      disable_edit:false,
      showDatetimePicker: false,
      showTimePicker: false,
      name: "",
      price: 0,
      quantity: 0,
      intro: "",
      image: [],
      bidding_or_not:false,
      new_or_not:true,
      files:[],
      progressTotal: 0,
      progressCurrent: 0,
      bidding_price_perbid: 0,
      bidding_price: 0,
      bidding_endtime: 0,
      bidding_endtime_time: 0,
      isUploading: false,
      pondHint: "點選或將拖曳以上傳圖片"
    }
  },
  methods: {
    handleFileDrop: function (files) {
      this.files = files.map((files) => files.file);
      if(this.files.length != 0) this.pondHint = "點選或將拖曳以上傳圖片<br>滑動以查看所有檔案"
      else this.pondHint = "點選或將拖曳以上傳圖片"
    },
    edit: async function () {
      this.isUploading = true;
      const data = new FormData();
      data.append('merchant_id',this.origin_item._id)
      for (let idx = 0; idx < this.files.length; idx++){
        data.append("files[]", this.files[idx]);
      }
      if(this.bidding_or_not === false){
        data.append('price',this.price);
        data.append('name',this.name);
      }
      data.append('quantity', this.quantity);
      data.append('intro', this.intro);
      if(this.new_or_not === true)
        this.new_or_not = "all_new"
      else
        this.new_or_not = "old"
      data.append('new_or_not', this.new_or_not);

      try {
        const res = await this.$axios.post(
            `${API_PREFIX}/merchant/edit_merchant`,
            data,
            {
              onUploadProgress: (e) => {
                this.progressTotal = e.loaded;
                this.progressCurrent = e.total;
              },
              headers:{
                token: this.$store.getters.token
              }
            }
          );
        this.$swal({
          title: "商品修改成功！",
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          this.isUploading = false
          console.log(res);
          this.$router.go(-1)
        });
      } catch (error) {
        console.log(error);
        this.$swal({
          title: "修改失敗！",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          this.isUploading = false
        });
      }
    },
    async fetchMerchant(){
      let id = this.$route.params.merchant_id;
      console.log(id);
      const merchant = await this.$axios.get(
        `${API_PREFIX}/merchant/get?id=${id}`,
      );
      this.origin_item = merchant.data.merchant;
      this.bidding_or_not = this.origin_item.is_bidding
      this.quantity = this.origin_item.count
      
      if(this.origin_item.status === "all_new"){
        this.new_or_not = true
      }
      else
        this.new_or_not = false
      console.log(this.new_or_not)
      this.name = this.origin_item.merchant_name
      this.intro = this.origin_item.discription
      this.img = this.origin_item.photo
      if(this.origin_item.is_bidding === true){
        this.disable_edit = true
        this.price = this.origin_item.bidding_price
        this.bidding_price_perbid = this.origin_item.bidding_price_perbid
        //this.bidding_endtime = this.origin_item.bidding_endtime
        //this.bidding_endtime_time = this.origin_item.bidding_endtime_time

      }
      else{
        this.price = this.origin_item.price
      }
      console.log(this.origin_item);
      console.log("fetch");
    },
    async init(){
      this.fetchMerchant();
      //console.log("init");
    }
  },
  mounted(){
    this.init();
  }
}
</script>