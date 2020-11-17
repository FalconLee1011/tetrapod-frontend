<template>
  <v-list-item>
    <v-list-item-avatar color="primary" size="40">
      <img src="https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png">
    </v-list-item-avatar>
    <v-list-item-content v-if="(type == 'merchantCard')">
      <v-list-item-title>Merchant</v-list-item-title>
      <v-list-item-subtitle>Uploader</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-content v-if="(type != 'merchantCard')">
      <v-list-item-title>User</v-list-item-title>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon>
        <v-icon color="grey lighten-1">mdi-share-variant</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props:{
    title: String,
    uploader: String,
    avatar: String,
    type: String,
  }
}
</script>