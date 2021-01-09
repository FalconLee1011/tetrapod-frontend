<template>
  <v-app-bar>
    <v-toolbar-title>
      <div class="hover" @click="$router.push('/')">
        消波塊購物 <v-icon> mdi-vector-triangle </v-icon>
      </div>
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
        @click:append="$emit('search', keyword)"
      />
    <v-spacer />
    <v-toolbar-items v-if="authPassed">
      <v-btn 
        @click="logout()"
        icon
        class="p-0" 
        elevation=0
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <div
        v-for="(item, i) in navItems"
        :key="i"
        :is="item.type"
        :icon="item.icon"
        :link="item.link"
        :items="item.items"
        v-on:knock="triggerDailogs('knock')"
      />
    </v-toolbar-items>
    <v-toolbar-items v-else>
      <v-btn 
        @click="triggerDailogs('login')"
        icon 
        class="p-0" 
        elevation=0
      >
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import navBtn from './NavBtn.vue';
import navBtnMenu from './NavBtnMenu.vue';
import search_bar from './search.vue';

const API_PREFIX = process.env.VUE_APP_API_PREFIX;

export default {
  components: {navBtn, navBtnMenu ,search_bar},
  data() {
    return {
      searchbarHint: "搜尋...",
      keyword: "",
      navItems:[
        {icon: "mdi-briefcase-upload-outline", 
         type: navBtnMenu, 
         items: [
          {title: "上傳商品", link: "/upload"},
          {title: "管理商品", link: "/product-management"},
          {title: "賣場管理", link: "/product-management"},
          {title: "訂單管理", link: "/order-management"},
         ], 
         link: ""
        },

        {icon: "mdi-cart-variant", 
         type: navBtn, 
         items: [], 
         link: "/cart"
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
          {title: "帳號管理", link: "/profile"},
          {title: "訂單查詢", link: "/order-tracking"},
          {title: "瀏覽紀錄", link: "/history"},
          {title: "敲", link: "", emitEvent: "knock" },
         ],
         link: ""
        },
      ],
      hotKeyWords: [
        "RTX 3090", "CyberBUG 2077", "浴室置物架", "室內拖鞋", "資工系工具人", "出租女友", "初音痛傘", "二手消波塊"
      ],
      req: {
        rating: undefined, 
        isGeneral: undefined, 
        isBidding: undefined, 
        minPrice: undefined, 
        maxPrice: undefined, 
        isNew: undefined, 
        old: undefined, 
      }
    }
  },
  computed:{
    authPassed(){ return this.$store.getters.authPassed; },
  },
  methods: {
    
    triggerDailogs: function (name) { this.$emit("triggerDailogs", name); },
    logout: function() {
      this.$axios.post(`${API_PREFIX}/auth/logout`, {token: this.$store.getters.token})
      this.$swal({
        icon: 'info',
        title: `See you :)`,
        showConfirmButton: false,
        timer: 1000,
      });
      this.$store.dispatch("deauth");
      location.reload('/')
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

<style scoped>
  .hover:hover{
    cursor: pointer;
  }
</style>