<template>
  <v-dialog v-model="dialog" max-width="800">
    <v-toolbar v-if="debug">
      <v-toolbar-title>KNOCK DEBUG TOOLS</v-toolbar-title>
      <v-btn
        @click="DEBUG_fetchChats" icon color="secondary"
      > <v-icon>mdi-refresh</v-icon> </v-btn>
      <v-btn
        @click="DEBUG_scrollToLastMsg" icon color="secondary"
      > <v-icon>mdi-format-vertical-align-bottom</v-icon> </v-btn>
      <v-btn
        @click="DEBUG_pushMessage" icon color="secondary"
      > <v-icon>mdi-playlist-plus</v-icon> </v-btn>
    </v-toolbar>
    <v-card max-width="800" class="mx-auto pb-4 scroll_disable" elevation="0">
      <v-card-title class="justify-center">
        <v-spacer />
        <h3 class="font-weight-medium">敲!</h3>
        <v-spacer />
        <v-btn @click="interact" style="position: absolute; right: 10px" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card elevation="24" class="mx-5 px-1" height="500">
        <v-overlay :value="knockLoading" absolute>
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-overlay>
        <v-card-text>
          <v-tabs v-model="tab" vertical>
            <v-tab 
              v-for="(knock, idx_tab) in knocks" 
              :key="`${idx_tab}_tab`"
            >
              {{ knock.to }}
            </v-tab>
            <v-tab-item
              v-for="(knock, idx_tab) in knocks"
              :key="`${idx_tab}_tab`"
              transition="fade-transition"
              reverse-transition="fade-transition"
            >
              <v-card 
                flat 
                height="400" 
                style="overflow: auto"
                ref="chatWindow"
              >
                <v-card-text>
                  <v-textarea
                    v-for="(knockMsg, idx) in knock.messages"
                    :key="`${idx}_msg_of_${knock._id}`"
                    readonly
                    v-model="knockMsg.message"
                    :label="epochConverter(knockMsg.timestamp)"
                    rounded
                    filled
                    class="mb-0"
                    :class="{ 'ml-auto': knockMsg.sender == $store.getters.account }"
                    max-length="50"
                    rows="1"
                    auto-grow
                    dense
                    style="max-width: 250px"
                    :ref="idx == knock.messages.length - 1 ? 'lastMsg' : ''"
                  />
                </v-card-text>
              </v-card>
              <v-footer height="70">
                <v-text-field
                  class="pt-2"
                  v-on:keyup.enter="sendMessage"
                  height="45"
                  v-model="input_message"
                  :append-outer-icon="input_message ? 'mdi-send' : ''"
                  filled
                  clear-icon="mdi-close-circle"
                  clearable
                  label="Message"
                  type="text"
                  @click:append-outer="sendMessage"
                  @click:clear="clearMessage"
                >
                </v-text-field>
              </v-footer>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
      </v-card>
    </v-card>
  </v-dialog>
</template>
<script>
//import movable from "v-movable";
//Vue.use(movable);
const API_PREFIX = process.env.VUE_APP_API_PREFIX;

export default {
  //components:{movable},
  props: {
    openChatOn: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      from_user: true,
      dialog: false,
      debug: true,
      model: null,
      tab: null,
      knocks: {},
      input_message: "",
      knockLoading: true,
    };
  },
  watch: {
    dialog(){
      // console.log("LOG FROM WATCH");
      // console.log(this.knocks);
      this.DEBUG_forceReload();
    },
  },
  methods: {
    // - DEBUG USAGE ONLAY BELOW - //
    async DEBUG_fetchChats(){
      await this.fetchChats();
      let clone = {};
      Object.assign(clone, this.knocks);
      this.knocks = clone;
    },
    DEBUG_forceReload(){
      let clone = {};
      Object.assign(clone, this.knocks);
      this.knocks = clone;
    },
    DEBUG_scrollToLastMsg(){
      console.log(this.$refs.lastMsg);
      console.log(this.$refs);
      for (const idx in this.$refs.lastMsg) {
        const el = this.$refs.lastMsg[idx];
        const toEl = this.$refs[`chatWindow`][idx];
        console.log("SCROLLING ");
        console.log(el);
        console.log("TO ");
        console.log(toEl);
        console.log("---- ");
        this.$vuetify.goTo(el, {
          container: toEl,
        });
      }
    },
    DEBUG_pushMessage(){
      this.knocks["5ff0d0be57359ff19999aeb0"].messages.push(
        {
          message: "<PUSHED ITEM>", 
          sender: "fuck", 
          timestamp: 1610682218.9658182
        }
      );
      // this.knocks = this.knocks
      let clone = {};
      Object.assign(clone, this.knocks);
      this.knocks = clone;
      this.scrollToLastMsg();
      // this.knocks = {};
    },
    tabClicked(){
      console.log("tabClicked");
      // this.scrollToLastMsg();
    },
    // - DEBUG USAGE ONLAY ABOVE - //
    async init() {
      await this.fetchChats();
      // console.log("----");
      // console.log(this.knocks);
      this.knockLoading = false;
      this.scrollToLastMsg();
    },
    sendMessage() {
      this.add_message();
      this.clearMessage();
    },
    clearMessage() {
      this.input_message = "";
    },
    add_message() {
      const roomID = Object.keys(this.knocks)[this.tab];
      const room = this.knocks[roomID];
      // console.log(room);
      const data = {
        token: this.$store.getters.token,
        roomID: roomID,
        message: this.input_message,
        receiver: room.to,
      };
      // console.log(data);
      this.$socket.client.emit("knock-send", data);
      // this.fetchMessage();
      // this.$vuetify.goTo(this.$refs.lastMsg[0], {
      // container: this.$refs.chatWindow,
      // });
    },
    scrollToLastMsg(){
      for (const idx in this.$refs.lastMsg) {
        const el = this.$refs.lastMsg[idx];
        const toEl = this.$refs[`chatWindow`][idx];
        this.$vuetify.goTo(el, { container: toEl });
      }
    },
    epochConverter(epoch) {
      let date = new Date(0);
      date.setUTCSeconds(epoch);
      const year = date.getFullYear();
      const month = ("0" + date.getMonth() + 1).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      // const seconds = date.getSeconds();
      return `${year}/${month}/${day} ${hours}:${minutes}`;
    },
    async fetchChats() {
      const res = await this.$axios.post(
        `${API_PREFIX}/knock/getRooms`,
        {
          token: this.$store.getters.token,
        },
        {
          headers: {
            token: this.$store.getters.token,
          },
        }
      );
      res.data.rooms.forEach((el) => {
        this.fetchMessage(el);
        this.$socket.client.emit("knock-init", {
          token: this.$store.getters.token,
          roomID: el._id,
        });
      });
    },
    async fetchMessage(knockObj) {
      let knockID = knockObj._id;
      knockObj.accounts.splice(
        knockObj.accounts.indexOf(this.$store.getters.account),
        1
      );
      knockObj.to = knockObj.accounts[0];
      this.fetchMessageByRoomID(knockID);
      this.knocks[knockID] = knockObj;
      let clone = {};
      Object.assign(clone, this.knocks);
      this.knocks = clone;
    },
    async fetchMessageByRoomID(roomID) {
      const res = await this.$axios.post(
        `${API_PREFIX}/knock/getRoom`,
        {
          roomID: roomID,
        },
        {
          headers: {
            token: this.$store.getters.token,
          },
        }
      );
      this.knocks[roomID].messages = res.data.room.messages;
    },
    interact() {
      this.dialog = !this.dialog;
    },
    async newMessage(msg) {
      // console.log(`NEW MESSAGE -> `);
      // console.log(msg);
      // await this.fetchChats();
      this.knocks[msg.roomID].messages.push(msg);
      let clone = {};
      Object.assign(clone, this.knocks);
      this.knocks = clone;
      this.scrollToLastMsg();
    },
    async knockOn(user) {
      // console.log(`Opening chat on ${user}...`);
      this.$emit('loading');
      const res = await this.$axios.post(
        `${API_PREFIX}/knock/createRoom`,
        {
          receiver: user,
        },
        {
          headers: {
            token: this.$store.getters.token,
          },
        }
      );
      this.interact();
      this.$emit('doneloading');
      if (res.data.status != "exist") {
        this.DEBUG_fetchChats();
        this.DEBUG_forceReload();
      }
      // console.log(res.data);
    },
  },
  computed: {
    // show_message() {
    //   return this.message_list.filter((item) => {
    //     if (item.from_id === this.tab) return true;
    //     else return false;
    //   });
    // },
  },
  updated() {
    // console.log("UPDATE");
    try {
      this.scrollToLastMsg();
      // document.querySelector(".v-tab--active").click();
    } catch (e) {e}
  },
};
</script>
<style>
.tile {
  background: #363636;
}
.tab-items-row >>> .v-window__container,
.tab-items-row >>> .v-window-item {
  height: 100%;
}
</style>