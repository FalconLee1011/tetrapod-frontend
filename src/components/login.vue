<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <template v-slot:activator="{on,attrs}">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
        Login
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="font-weight-bold justify-center"
        >
          <h2>登入</h2>
        </v-card-title>
        <v-card-text>
          <v-container
            style="max-width:75%"
          >
            <v-row>
              <v-col 
                cols="12"
                
              >
                <v-text-field
                  label="帳號"
                  required
                  filled
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="密碼"
                  v-model="password"
                  required
                  filled
                  persistent-hint
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1?'text':'password'"
                  counter
                  @click:append="show1= !show1"
                ></v-text-field>
                <a class="grey--text">忘記密碼？</a>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="deep-purple lighten-3"
            light
            font-weight-bold
            @click="dialog = false"
            class="font-weight-bold"
          >
            註冊
          </v-btn>
          <v-btn
            color="deep-purple lighten-3"
            light
            font-weight-bold
            @click="dialog = false"
            class="font-weight-bold"
          >
            登入
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data :()=> ({
      dialog:false,
      show1: false,
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        account_password_Match: () => (`The email and password you entered don't match`),
      },
    })
  }
</script>