<template>
  <v-menu
    bottom
    offset-y
    persistent
    :close-on-content-click="false"
  >
    <template v-slot:activator="{on, attrs}">
      <v-btn
        v-bind="attrs"
        v-on="on"
        icon
      >
      <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <v-list v-if="ready">
      <v-list-item
        v-for="(item, i) in notifications"
        :key="i"
        :disabled="item.disabled || false"
        link
      >
        <v-list-item-content>
          {{ item.notifications.content }}
        </v-list-item-content>
        <v-btn icon small color="red" style="ml-2" @click="removeNotify(i)"><v-icon>mdi-delete-outline</v-icon></v-btn>
      </v-list-item>
      <v-list-item v-if="notifications.length == 0">
        <v-list-item-content>
          沒有任何通知喔！
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
const API_PREFIX = process.env.VUE_APP_API_PREFIX;


export default {
  props: {
    icon: String,
  },
  data() {
    return {
      notifications: [],
      ready: false,
    }
  },
  methods: {
    notEmit(arg){
      console.log(arg);
      this.$emit(arg);
    },
    async fetchNotify(){
      const account = this.$store.getters.account;
      const res = await this.$axios.get(`${API_PREFIX}/io/notification/get-notify?account=${account}`)
      console.log(res);
      if(res.data.notifications.length != 0){
        this.notifications = res.data.notifications.reverse();
      }
      this.ready = true;
    },
    async removeNotify(idx){
      const id = this.notifications[idx]._id;
      this.notifications.splice(idx, 1);
      const res = await this.$axios.get(`${API_PREFIX}/io/notification/redact-notify?id=${id}`)
      console.log(res);
    }
  },
  beforeMount() {
    this.fetchNotify();
  },
  mounted() {
    console.log("------ MOUNTED ------");
    console.log(this.notifications);
  },
};
</script>