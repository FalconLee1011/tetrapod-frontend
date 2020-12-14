<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-overlay v-model="isLogging">
      <v-progress-circular indeterminate color="primary" ></v-progress-circular>
    </v-overlay>
    <passRst v-on:closerst="resetPass = false" :show="resetPass" />
    <v-card>
      <v-card-title class="font-weight-bold justify-center">
        <v-spacer />
        <h2>登入</h2>
        <v-spacer />
        <v-btn @click="$emit('close')" style="position: absolute; right: 10px;" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container style="max-width: 75%">
          <v-row>
            <v-col cols="12">
              <v-text-field 
                label="帳號" 
                required
                filled
                v-model="account"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="密碼"
                v-model="password"
                required
                filled
                persistent-hint
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
              <a @click="resetPass = true" class="grey--text">忘記密碼？</a>
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
          @click="$emit('register')"
        >
          註冊
        </v-btn>
        <v-btn
          color="primary"
          style="color: black;"
          light
          @click="login()"
        >
          登入
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import passRst from './password-reset';
const API_PREFIX = process.env.VUE_APP_API_PREFIX;

export default {
  components:{ passRst },
  props:{
    show: Boolean
  },
  data: () => ({
    account: "",
    isLogging: false,
    show1: false,
    resetPass: false,
    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      account_password_Match: () =>
        `The email and password you entered don't match`,
    },
  }),
  methods: {
    async login(){
      this.isLogging = true;
      try {
        let res = await this.$axios.post(
          `${API_PREFIX}/auth/login`,
          {
            account: this.account,
            password: this.password,
          }
        )
        console.log(res.data);
        const FN = res.data.account.last_name
        const LN = res.data.account.first_name
        this.$swal({
          icon: 'success',
          title: `歡迎，${LN} ${FN}`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.$store.dispatch("setToken", {id: res.data.token, account: res.data.account.account})
        this.$emit('close')
      } catch (_) {
        this.$swal({
          icon: 'error',
          title: "帳號或密碼錯誤！",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(_);
      }
      this.isLogging = false;
    }
  },
};
</script>