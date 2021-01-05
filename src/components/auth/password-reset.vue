<template>
  <v-dialog
    v-model="show"
    max-width="40%"
  >
  <v-dialog
    v-model="fireeeeeee"
    max-width="40%"
  >
  <v-card>
    <v-card-title>
      驗證碼錯誤！
    </v-card-title>
  </v-card>
  </v-dialog>
    <v-card>
      <v-card-title>重設密碼</v-card-title>
      <v-stepper 
        v-model="step"
      >
        <v-stepper-header>
          <v-stepper-step 
            :complete="step > 0" 
            step="1"
          >
            確認您的 E-mail
          </v-stepper-step>
          <v-divider />
          <v-stepper-step 
            :complete="step > 1" 
            step="2"
          >
            驗證您的身份
          </v-stepper-step>
          <v-divider />
          <v-stepper-step 
            :complete="step > 2" 
            step="3"
          >
            設定您的新密碼
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card-text>
              <v-text-field
                label="E-mail"
                placeholder="請輸入您的 E-mail"
                v-model="mail"
                required
                filled
                @click:append="show1 = !show1"
              />
            </v-card-text>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card-text>
              <v-text-field
                label="驗證碼"
                :placeholder="`請輸入您於 ${mail} 所收到的驗證碼`"
                v-model="verify"
                required
                filled
                @click:append="show1 = !show1"
              />
            </v-card-text>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card-text>
              <v-form ref="newPassForm" lazy-validation @submit.prevent>
                <v-text-field
                  label="新密碼"
                  placeholder="請輸入您的新密碼"
                  :type="(show1) ? 'text' : 'password'"
                  v-model="password"
                  :rules="[v => v === this.passwordCFN || '請確認此兩欄位的密碼為一致']"
                  required
                  filled
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show1 = !show1"
                />
                <v-text-field
                  label="確認新密碼"
                  placeholder="請再次輸入您的新密碼"
                  :type="(show1) ? 'text' : 'password'"
                  v-model="passwordCFN"
                  :rules="[v => v === password || '請確認此兩欄位的密碼為一致']"
                  required
                  filled
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show1 = !show1"
                />
              </v-form>
            </v-card-text>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="cancel()" outlined color="primary">取消</v-btn>
        <v-btn @click="nextStep()" :disabled="isFetching" color="primary">
          <v-progress-circular
            indeterminate
            size="15"
            width="2"
            color="grey"
            style="margin-right: 0.2em;"
            v-if="isFetching"
          ></v-progress-circular>
          {{btnHint}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const API_PREFIX = process.env.VUE_APP_API_PREFIX;

export default {
  data() {
    return {
      show: false,
      step: 1,
      mail: undefined,
      verify: undefined,
      password: undefined,
      passwordCFN: undefined,
      isFetching: false, 
      btnHint: "送出驗證碼", 
      errMsg: undefined,
      fireeeeeee: false,
      show1: false,
    }
  },
  methods: {
    fire(msg){
      this.errMsg = msg;
      this.fireeeeeee = true;
      setTimeout(function () {
        this.fireeeeeee = false;
      }, 1000);
    },
    ///////////////////// IMPORTANT /////////////////////
    // * fetch() is RESERVED FOR FURTHER DEVELOPMENT
    ///////////////////// IMPORTANT /////////////////////
    async fetch(API, data){
      let res = undefined;
      try {
        res = await this.$axios.post(
          `${API_PREFIX}${API}`, 
          data
        );
        console.log(res);
        if(res.data.status === "ok") return true;
        else return false;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async nextStep(){
      let res = undefined;
      switch (this.step) {
        case 1:
          this.isFetching = true;
          this.btnHint = "正在送出驗證碼...";
          res = await this.fetch('/auth/checkemail', {"email": this.mail});
          if(!res){
            this.$swal({
              icon: 'error',
              title: `帳號不存在 或 E-mail 格式錯誤`,
              showConfirmButton: true,
            });
            this.btnHint = "送出驗證碼";
            this.isFetching = false;
            return
          }
          this.btnHint = "驗證";
          this.step += 1;
          this.isFetching = false;
          break;
        case 2:
          this.isFetching = true;
          this.btnHint = "驗證中...";
          res = await this.fetch('/auth/check_verification_code', {"token": this.verify, "email": this.mail});
          if(!res){
            this.$swal({
              icon: 'error',
              title: `驗證碼錯誤！`,
              showConfirmButton: true,
            });
            this.isFetching = false;
            this.btnHint = "驗證";
            return
          }
          this.btnHint = "完成設定";
          this.step += 1;
          this.isFetching = false;
          break;
        case 3:
          if(! this.$refs.newPassForm.validate()){ return } 
          res = await this.fetch('/auth/resetpassword', {"password": this.password, "email": this.mail, "token": this.verify});
          if(res){
            this.$swal( '密碼重設完成！' );
            this.show = false;
          }
          break;
        default:
          break;
      }
    },
    cancel(){
      this.step = 1;
      this.mail = undefined;
      this.verify = undefined;
      this.password = undefined;
      this.passwordCFN = undefined;
      this.isFetching = false;
      this.btnHint = "送出驗證碼";
      this.show = false;
    },
    interact(){ this.show = !this.show; }
  },
}
</script>