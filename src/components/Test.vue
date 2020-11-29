<template>
  <v-container>
    <v-card>
      <v-card-title>{{msg}}</v-card-title>
      <v-text-field v-model="name" />
      <v-btn @click="fuck"> 不要按我 &gt; &lt; </v-btn>
    </v-card>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      msg: "click the button below",
      name: "",
    }
  },
  methods: {
    fuck: async function(){
      const response = await this.$axios.post(
        "http://192.168.100.161:9001/get-test",
        {name: this.name},
      );
      this.msg = response.data.message;
    }
  },
}
</script>