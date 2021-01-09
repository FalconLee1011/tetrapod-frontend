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
      >正在上傳商品...</v-progress-circular>
    </v-overlay>
    <v-card-title style="font-weight:lighter">
      <h3>上傳商品</h3>
    </v-card-title>
    <v-container class="mt-8 px-15">
      <v-row>
        <v-col cols="6" sm="4" class="px-2">
          <p>交易類型</p>
          <v-radio-group
            v-model="bidding_or_not"
            row
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
              value="all_new"
            ></v-radio>
            <v-radio
              label="二手"
              value="old"
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
          <v-text-field filled label="商品價格" v-model="price">
        
          </v-text-field>
        </v-col>
        <v-col cols='4'>
          <v-text-field filled label="庫存數量" v-model="quantity">
            
          </v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="bidding_or_not">
        <v-col cols='3'>
          <v-text-field filled label="每標最低出價" v-model="bidding_price">
          </v-text-field>
        </v-col>
        <v-col cols='3'>
          <v-text-field filled label="最高價" v-model="bidding_price_perbid">
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
          @click="$router.previous()"
          class="font-weight-bold"
        >
          取消
        </v-btn>
        <v-btn
          color="deep-purple lighten-3"
          light
          width="100px"
          font-weight-bold
          @click="upload"
          class="font-weight-bold"
        >
          上傳商品
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

export default{
  components: { FilePond },
  data(){
    return{
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
    upload: async function () {
      this.isUploading = true;
      const data = new FormData();
      for (let idx = 0; idx < this.files.length; idx++){
        data.append("files[]", this.files[idx]);
      }

      API_PREFIX;
      let ENDtime = new Date(`${this.bidding_endtime}T${this.bidding_endtime_time}:00Z`);

      console.log(this.bidding_or_not);
  
      data.append('name', this.name);
      data.append('price', this.price);
      data.append('quantity', this.quantity);
      data.append('intro', this.intro);
      data.append('bidding_or_not', this.bidding_or_not);
      data.append('new_or_not', this.new_or_not);
      data.append('bidding_price_perbid', this.bidding_price_perbid);
      data.append('bidding_price', this.bidding_price);
      data.append('bidding_endtime', ENDtime.getTime() / 1000);

      try {
        const res = await this.$axios.post(
          `${API_PREFIX}/merchant/upload`, 
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
          title: "商品新增成功！",
          icon: 'success',
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          this.isUploading = false
          console.log(res);
        });
      } catch (error) {
        console.log(error);
        this.$swal({
          title: "上傳失敗！",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          this.isUploading = false
        });
      }
      this.isUploading = false
    }
  },
}
</script>