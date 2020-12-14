<template>
  <v-menu
      bottom
      offset-y
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
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.link"
        :disabled="item.disabled || false"
        link
      >
        <v-list-item-content>{{ item.title }}</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>

export default {
  props: {
    icon: String,
    items: Array,
  },
};
</script>