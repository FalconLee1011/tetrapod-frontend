<template>
  <v-list-item @click="$router.push(`/market/${uploader}`)">
    <v-list-item-avatar color="primary" size="40">
      <img v-if="avatar" :src="avatar">
      <img v-else src="https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png">
    </v-list-item-avatar>
    <v-list-item-content v-if="(type == 'merchantCard')">
      <v-list-item-title>
        <v-chip label outlined small color="#e67700" v-if="isbidding && !hasBeenWon">競標</v-chip>
        <v-chip label outlined small color="#ff0000" v-if="isbidding && hasBeenWon">已結標</v-chip>
        {{title}}
      </v-list-item-title>
      <v-list-item-subtitle>{{uploader}}</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-content v-if="(type != 'merchantCard')">
      <v-list-item-title>{{user}}</v-list-item-title>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon>
        <!-- <v-icon color="grey lighten-1">mdi-share-variant</v-icon> -->
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapActions } from 'vuex'
const API_PREFIX = process.env.VUE_APP_API_PREFIX;

export default {
  props:{
    title: {
      type: String,
      default: "Merchant"
    },
    uploader: {
      type: String,
      default: "Uploader"
    },
    user: {
      type: String,
      default: "user name"
    },
    type: {
      type: String,
      default: "merchantCard"
    },
    avatar: {
      type: String,
      default: "https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"
    },
    isbidding:{
      type: Boolean,
    },
    hasBeenWon:{
      type: Boolean,
    },
  },
  async mounted() {
    const res = await this.$axios.post(
        `${API_PREFIX}/accounts/get`,
        {
          account: this.uploader,
        }
      )
      this.avatar = await this.generateBlob(res.data.account.account_avator);
  },
  methods: {
    ...mapActions( [ "generateBlob" ] ),
  },
}
</script>