<template>
    <v-card 
    class="mx-auto"
    style="margin: 1rem 0"
    max-width="900px">
      <v-card-title class="headline">
        <span>個人檔案管理</span>
      </v-card-title>
      <v-card-text>
        <v-container style="padding:0px 150px">
          <div class="file-preview-zone" v-if="edit">
            <FilePond 
              ref="uploader"
              name="pictures"
              :label-idle="pondHint"
              instantUpload="false"
              v-on:updatefiles="handleFileDrop"
            />
          </div>
          <v-avatar color="primary" size="50" v-if="!edit">
            <img :src="avatar">
          </v-avatar>
          <v-row>
            <v-col cols="12" height=10px>
              <v-text-field :disabled="!edit" outlined label="暱稱" v-model="nickname" required filled ></v-text-field>
              
            </v-col>
            <v-col cols="6">
              <v-text-field :disabled="!edit" outlined label="姓氏" v-model="firstname" required filled></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field :disabled="!edit" outlined label="名字" v-model="secondname" required filled></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field :disabled="!edit" outlined label="Email" v-model="email" required filled></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field :disabled="!edit" outlined label="電話" v-model="phone_number" required filled></v-text-field>
            </v-col>
            <v-col cols="6" v-if="edit">
              <v-text-field
                outlined
                label="密碼"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                v-model="password"
                required
                onCopy="return false"
                @click:append="show1 = !show1"
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="6" v-if="edit">
              <v-text-field
                outlined
                label="確認密碼"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                v-model="password2"
                required
                @click:append="show2 = !show2"
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :disabled="!edit"
                    outlined
                    v-model="date"
                    label="生日(選填)"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    filled
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-select :disabled="!edit" outlined v-model="gender" :items="['男', '女', '非二元', '秘密']" label="性別(選填)" filled></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                :disabled="!edit" outlined
                autocomplete="email"
                label="賣場簡介"
                v-model="market_about"
                filled
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          color="error" 
          style="color: black;"
          light
          @click="cancel"
        >
          取消
        </v-btn>
        <v-btn 
          color="primary" 
          style="color: black;"
          light
          @click="change"
        > 
          {{ btn1 }} 
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
const API_PREFIX = process.env.VUE_APP_API_PREFIX;
export default {
  props: {
    show: Boolean,
  },
  name: "profile",
  data(){
    return {
      edit:false,
      date: null,
      menu: false,
      show1: false,
      show2: false,
      avatar:undefined,
      nickname:undefined,
      firstname:undefined,
      secondname:undefined,
      email:undefined,
      phone_number:undefined,
      password:undefined,
      password2:undefined,
      gender:undefined,
      market_about:undefined,
      files:[],
      isUploading:false,
      btn1:"修改個人檔案",
      pondHint: "點選或將拖曳以上傳圖片",
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    change: function () {
      this.edit=!this.edit
      if (this.edit) {
        this.btn1="完成"
      }
      else{
        this.btn1="修改個人檔案"
        this.upload();
      }
    },
    cancel: function () {
      this.edit=false
    },
    fetchData: async function () {
      const res = await this.$axios.post(
        `${API_PREFIX}/accounts/get-user`,{
          account: this.$store.getters.account
        }
      )
      const account=res.data.account
      console.log(account);
      this.avatar= account.account_avator;
      this.date = account.birth_date;
      this.date = account.birth_date;
      this.nickname = account.nick_name;
      this.firstname = account.first_name;
      this.secondname = account.last_name;
      this.email = account["e-mail"];
      this.phone_number = account.phone;
      this.gender = account.sex;
      this.market_about = res.data.account.market_description;
      console.log(this.avatar);
    },
    handleFileDrop: function (files) {
      this.files = files.map((files) => files.file);
    },
    upload: async function () {
      if(this.password=="" || this.password2=="" || this.password==undefined ||this.password2==undefined){
        this.$swal({
          title: "密碼不可為空白！",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        })
        return;
      }
      this.isUploading = true;
      const data = new FormData();
      data.append("account_avator", this.files);
      console.log(this.files);
      data.append('birth_date', this.date);
      data.append('nick_name', this.nickname);
      data.append('first_name', this.firstname);
      data.append('last_name', this.secondname);
      data.append('e-mail', this.email);
      data.append('phone', this.phone_number);
      data.append('password', this.password);
      data.append('confirm_password', this.password2);
      data.append('sex', this.gender);
      data.append('market_description', this.market_about);

      try {
        const res = await this.$axios.post(
          `${API_PREFIX}/auth/editaccount`, 
          data,
          {
            headers:{
              token: this.$store.getters.token
            }
          }
        );
        this.$swal({
          title: "資料更新成功！",
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
          title: "更新失敗！",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          this.isUploading = false
        });
      }
      this.isUploading = false
    }
  }
};
</script>
