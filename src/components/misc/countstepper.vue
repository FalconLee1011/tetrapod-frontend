<template>
  <v-text-field
    v-model="n"
    prepend-inner-icon="mdi-minus"
    append-icon="mdi-plus"
    outlined 
    dense
    class="stepper"
    @click:prepend-inner="min"
    @click:append="add"
  ></v-text-field>
</template>

<style lang="css">
  .stepper{
    width: 7.5rem !important; 
  }
  .stepper input{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
</style>

<script>
export default {
  name: "countstepper",
  props: { n: Number },
  methods: {
    add(){
      this.n += 1;
      this.$emit("add")
    },
    min(){
      if(this.n > 1) this.n -= 1;
      this.$emit("min")
    },
  },
  
};
</script>
