<template>
  <v-app-bar>
    <v-toolbar-title>
      消波塊購物 <v-icon> mdi-vector-triangle </v-icon>
    </v-toolbar-title>
    <v-spacer />
      <v-text-field
        :placeholder="searchbarHint"
        hide-details
        append-icon="mdi-magnify"
        v-model="keyword"
        ref="searchbar"
        @mouseover="toggleSearchbarHint"
        @mouseleave="toggleSearchbarHint"
        @click:append="search"
      />
    <v-spacer />
    <v-toolbar-items>
      <div
        v-for="(item, i) in navItems"
        :key="i"
        :is="item.type"
        :icon="item.icon"
        :link="item.link"
        :items="item.items"
      />
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import navBtn from './NavBtn.vue';
import navBtnMenu from './NavBtnMenu.vue';

export default {
  components: {navBtn, navBtnMenu},
  data() {
    return {
      searchbarHint: "搜尋...",
      keyword: "",
      navItems:[
        {icon: "mdi-login", 
         type: navBtn, 
         items: [], 
         link: ""
        },

        {icon: "mdi-briefcase-upload-outline", 
         type: navBtnMenu, 
         items: [
          {title: "上傳商品", link: ""},
          {title: "管理商品", link: ""},
          {title: "賣場管理", link: ""},
          {title: "訂單管理", link: ""},
         ], 
         link: ""
        },

        {icon: "mdi-cart-variant", 
         type: navBtn, 
         items: [], 
         link: ""
        },
        {icon: "mdi-bell-outline", 
         type: navBtnMenu, 
         items: [
           {title: "您的商品向吉娃哇訂購的 物理課本 已經出貨", link: ""},
         ], 
         link: ""
        },

        {icon: "mdi-menu", 
         type: navBtnMenu, 
         items: [
          {title: "帳號管理", link: ""},
          {title: "訂單查詢", link: ""},
          {title: "敲", link: "", disabled: false},
         ],
         link: ""
        },
      ],
      hotKeyWords: [
        "RTX 3090", "CybetPunk 2077", "浴室置物架", "室內拖鞋", "資工系工具人", "出租女友", "初音痛傘", "二手消波塊"
      ],
    }
  },
  methods: {
    search: function(){
      console.log(`U searched ${this.keyword}`)
    },
    toggleSearchbarHint: function () {
      if(this.searchbarHint === "搜尋..."){
        const select = this.hotKeyWords[Math.floor(Math.random() * this.hotKeyWords.length)];
        this.searchbarHint = `在此輸入您想搜尋的商品關鍵字，例如：${select}`;
        this.$refs.searchbar.focus();
      }
      else {
        this.searchbarHint = "搜尋...";
        this.$refs.searchbar.blur();
      }
    },
  },
}
</script>