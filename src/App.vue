<template>
  <v-app>
    <v-overlay :value="isLoading">
      <v-progress-circular
        indeterminate
        color="primary"
      >
      </v-progress-circular>
      <span v-if="loadinghint">{{loadinghint}}</span>
    </v-overlay>
    <knock 
      ref="knock"
      v-on:loading="isLoading = true"
      v-on:doneloading="isLoading = false"
    />
    <login 
      ref="login"
      v-on:register="triggerDailogs('register')"
    />
    <signup 
      ref="register"
    />
    <div>
      <navbar
        v-on:triggerDailogs="triggerDailogs($event)"
        v-on:openChat="openChat($event)"
        v-on:search="search($event)"
      />
      <router-view 
        ref="routerview"
        v-on:openChat="openChat($event)"
        v-on:loading="loadingHandler($event, true)"
        v-on:doneloading="loadingHandler($event, false)"
        v-on:advSearch="advSearch($event)"
      />
    </div>
  </v-app>
</template>

<style scoped>
  @import './assets/css/swal-dark.min.css';
</style>

<script>
import navbar from './components/misc/Navbar.vue'
import knock from './components/knock_talk/knock_talk.vue'
import login from './components/auth/login';
import signup from './components/auth/signup';

// const API_PREFIX = process.env.VUE_APP_API_PREFIX;
const advKeys = ["keyword", "rating", "isGeneral", "isBidding", "minPrice", "maxPrice", "isNew", "old"];


export default {
  name: 'App',
  components: { navbar, knock, login, signup },
  data() {
    return {
      openChatOn: "",
      isLoading: false,
      loadinghint: undefined,
    }
  },
  mounted() {
    this.$vuetify.theme.dark
    this.$socket.client.open();
    // this.openChat({});
  },
  beforeDestroy() {
    this.$socket.client.emit( 'disconnect' );
    this.$socket.client.close();
  },
  methods: {
    advSearch:function(reqs){
      console.log(reqs);
      let search = {}
      for (const k in reqs) {
        const v = reqs[k];
        if(v) search[k] = v;
      }
      console.log(search);
      const searchURL = new URLSearchParams( search )
      history.pushState({}, null, `/search?${searchURL}`);
      this.search();
    },
    search: function(keyword){
      this.isLoading = true;
      console.log(keyword);
      let url = new URL(window.location.href);
      let search = {}
      for (const i in advKeys) {
        const k = advKeys[i];
        const cdt = url.searchParams.get(k);
        if(cdt) search[k] = cdt;
      }
      if(keyword != search.keyword && (keyword))search.keyword = keyword
      const searchURL = new URLSearchParams( search )

      if(this.$router.currentRoute.path == '/search'){
        history.pushState({}, null, `/search?${searchURL}`);
        this.$refs.routerview.search()
      }
      else this.$router.push(`/search?${searchURL}`)
    },
    triggerDailogs: function (name) { this.$refs[name].interact(); },
    openChat(event){
      const openChatOn = event.to;
      console.log(openChatOn);
      if (openChatOn == this.$store.getters.account) {
        this.$swal({
          icon: "question",
          title: "你真的有孤單到要跟自己聊天嗎OAO?",
          showDenyButton: true,
          confirmButtonText: "我好孤單。･ﾟ･(つд`ﾟ)･ﾟ･",
          denyButtonText: '不，我朋友很多ヽ(∀ﾟ )人(ﾟ∀ﾟ)人( ﾟ∀)人(∀ﾟ )人',
        }).then(async (res) => {
            if(res.isConfirmed){ location.href = "https://wootalk.today/"; }
          }
        )
        this.isLoading = false;
        return
      }
      if(openChatOn){ this.$refs["knock"].knockOn(openChatOn); }
      else{ this.$refs["knock"].interact(); }
    },
    loadingHandler(event, toggle){
      this.isLoading = toggle;
      if(event != undefined) this.loadinghint = event.text || undefined;
      else this.loadinghint = undefined;
    }
  },
  sockets: {
    connected() {
      this.$toast.warning(
        `[DEBUG] IO connected! and auth is ${this.$store.getters.authPassed}`,
        {
          timeout: 1500,
        }
      );
      if(this.$store.getters.authPassed){
        let user = window.localStorage.getItem('account');
        let token = window.localStorage.getItem('token');
        this.$store.dispatch('setToken', { id: token, account: user });
      }
    },
    inited(msg){
      this.identity = msg.account;
      this.$toast.warning(
        `[DEBUG] IO Inited, welcome, ${msg.account}`,
        {
          timeout: 1500,
        }
      );
      this.$refs["knock"].init();
    },
    notify(msg){
      this.$toast.success(
        `${msg.content}`,
        {
          icon: msg.type,
          title: `${msg.content}`,
          showConfirmButton: true,
          timeout: 2250,
        }
      );
    },
    newMessage(msg){
      this.$refs["knock"].newMessage(msg);
    },
    bidUpdateResult(msg){
      console.log(msg);
      if(this.$router.currentRoute.name == 'merchantPage')
        this.$refs.routerview.bidUpdateResult(msg);
      else{
        if(msg.type == 'update' && msg.msg == 'winner' && msg.payload.winner == this.$store.getters.account){
          this.$toast.success(`您已得標 ${msg.payload.merchant_name} ，系統已自動將商品加入您的購物車！`,
            {
              timeout: 3000,
              position: 'top-right'
            }
          )
        }
      }
    }
  }
}
</script>

<style>
* { font-family: Avenir, Helvetica, Arial, sans-serif; }
</style>
