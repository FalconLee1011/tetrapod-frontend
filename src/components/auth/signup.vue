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
              <v-text-field label="帳號" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="暱稱" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="姓氏" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="名字" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Email" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="電話" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="密碼"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                required
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
            </v-col>
            <v-col cols="6">
              <v-select :items="['男', '女', '非二元', '秘密']" label="性別(選填)"></v-select>
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
          @click="interact"
        > 
          註冊 
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "signup",
  data: () => ({
    date: null,
    menu: false,
    show: false,
    show1: false,
    show2: false,
  }),
  methods: {
    interact(){ this.show = !this.show; }
  },
};
</script>
