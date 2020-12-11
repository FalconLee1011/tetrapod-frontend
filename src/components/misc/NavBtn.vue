<template>
  <v-btn 
    :to=link
    icon 
    class="p-0" 
    elevation=0
  >
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
  
</template>

<script>
export default {
  props: {
    icon: String,
    link: String,
  },
};
</script>