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
          <v-row>
            <v-file-input label="上傳大頭貼"></v-file-input>
            <v-col cols="12">
              <v-text-field v-if="edit" label="暱稱" v-model="nickname" required></v-text-field>
              <div v-if="(!edit)" style="font-size:150%;padding:10px;background-color:#323232">{{ nickname }}</div>
            </v-col>
            <v-col cols="6">
              <v-text-field v-if="edit" label="姓氏" v-model="firstname" required></v-text-field>
              <div v-if="(!edit)" style="font-size:150%;padding:10px;background-color:#323232">{{ firstname }}</div>
            </v-col>
            <v-col cols="6">
              <v-text-field v-if="edit" label="名字" v-model="secondname" required></v-text-field>
              <div v-if="(!edit)" style="font-size:150%;padding:10px;background-color:#323232">{{ secondname }}</div>
            </v-col>
            <v-col cols="6">
              <v-text-field v-if="edit" label="Email" v-model="email" required></v-text-field>
              <div v-if="(!edit)" style="font-size:150%;padding:10px;background-color:#323232">{{ email }}</div>
            </v-col>
            <v-col cols="6">
              <v-text-field v-if="edit" label="電話" v-model="phone_number" required></v-text-field>
              <div v-if="(!edit)" style="font-size:150%;padding:10px;background-color:#323232">{{ phone_number }}</div>
            </v-col>
            <v-col cols="6" v-if="edit">
              <v-text-field
                label="密碼"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                required
                onCopy="return false"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
            <v-col cols="6" v-if="edit">
              <v-text-field
                label="確認密碼"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                required
                @click:append="show2 = !show2"
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
                v-if="edit"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="生日(選填)"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
              <div v-if="(!edit) && date!=null" style="font-size:150%;padding:10px;background-color:#323232">{{ date }}</div>
              <div v-if="(!edit) && date==null" style="font-size:150%;padding:10px;background-color:#323232">尚未填寫</div>
            </v-col>
            <v-col cols="6">
              <v-select v-if="edit" v-model="gender" :items="['男', '女', '非二元', '秘密']" label="性別(選填)"></v-select>
              <div v-if="(!edit)" style="font-size:150%;padding:10px;background-color:#323232">{{ gender }}</div>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-if="edit"
                autocomplete="email"
                label="賣場簡介"
                v-model="market_about"
              ></v-textarea>
              <div v-if="(!edit)" style="font-size:150%;padding:10px;background-color:#323232">{{ market_about }}</div>
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
      nickname:"消小塊",
      firstname:"蕭",
      secondname:"曉快",
      email:"ntouyeah@mail.com",
      phone_number:"0900000000",
      gender:"女",
      market_about:"這裡有很多消波塊",
      btn1:"修改個人檔案",
    }
  },
  methods: {
    change: function () {
      this.edit=!this.edit
      if (this.edit) {
        this.btn1="完成"
      }
      else{
        this.btn1="修改個人檔案"
      }
    }
  }
};
</script>
