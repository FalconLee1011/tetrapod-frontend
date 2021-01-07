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
      />
      <router-view 
        v-on:openChat="openChat($event)"
        v-on:loading="loadingHandler($event, true)"
        v-on:doneloading="loadingHandler($event, false)"
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
    triggerDailogs: function (name) { this.$refs[name].interact(); },
    openChat(event){
      const openChatOn = event.to;
      console.log(openChatOn);
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
    }
  }
}
</script>

<style>
* { font-family: Avenir, Helvetica, Arial, sans-serif; }
</style>
