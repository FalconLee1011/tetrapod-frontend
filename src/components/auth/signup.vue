<template>
  <v-dialog v-model="show" persistent max-width="700px">
    <v-card>
      <v-card-title style="text-align: center" class="justify-center headline">
        <span>免費註冊</span>
      </v-card-title>
      <v-card-subtitle style="text-align: center">
        <span class="subline">成為會員買賣商品！</span>
      </v-card-subtitle>
      <v-card-text>
        <small>註冊即代表您同意我們的<a>使用者條款</a>及<a>隱私政策</a></small>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="form.account" label="帳號" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="form.nick_name" label="暱稱" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="form.last_name" label="姓氏" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="form.first_name" label="名字" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="form.email" label="Email" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="form.phone" label="電話" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="密碼"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                required
                v-model="form.password"
                onCopy="return false"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
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
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="生日(選填)"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.birth_date"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-select v-model="form.sex" :items="['男', '女', '非二元', '秘密']" label="性別(選填)"></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          color="primary" 
          style="color: black;"
          light
          @click="interact"
        >
          取消
        </v-btn>
        <v-btn 
          color="primary" 
          style="color: black;"
          light
          @click="submit"
        > 
          註冊 
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const API_PREFIX = process.env.VUE_APP_API_PREFIX;

export default {
  name: "signup",
  data: () => ({
    date: null,
    menu: false,
    show: false,
    show1: false,
    show2: false,
    form:{
      first_name: undefined,
      last_name: undefined,
      nick_name: undefined,
      account: undefined,
      email: undefined,
      phone: undefined,
      password: undefined,
      birth_date: undefined,
      sex: undefined,
    }
  }),
  methods: {
    interact(){ this.show = !this.show; },
    async submit(){
      try {
        const res = await this.$axios.post(
          `${API_PREFIX}/auth/register`,
          this.form,
        );
        if(res.data.status == "ok"){
          this.$swal({
            icon: 'success',
            title: `${this.form.first_name}, 歡迎加入消波塊大家庭！`,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.interact()
          });
        }
        else{
          this.$swal({
            icon: 'error',
            title: `${res.data.status}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.log(error);
        console.log(error.response);
      }
      // 
    }
  },
};
</script>
