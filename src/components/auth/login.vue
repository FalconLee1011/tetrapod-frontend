<template>
  <v-dialog v-model="show" max-width="600px">
    <passRst v-on:closerst="resetPass = false" :show="resetPass" />
    <v-card>
      <v-card-title class="font-weight-bold justify-center">
        <h2>登入</h2>
      </v-card-title>
      <v-card-text>
        <v-container style="max-width: 75%">
          <v-row>
            <v-col cols="12">
              <v-text-field label="帳號" required filled></v-text-field>
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
          @click="$emit('close')"
        >
          登入
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import passRst from './password-reset';

export default {
  components:{ passRst },
  props:{
    show: Boolean
  },
  data: () => ({
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
};
</script>