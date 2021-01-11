<template>
  <v-card color="#282828" elevation="0">
    <v-row justify="center" align="center">
      <v-col cols="4">
        <v-row align="center">
          <v-col cols="4" class="py-0">
            <v-img max-height="5em" max-width="5em" :src="img">
            </v-img>
          </v-col>
          <v-col cols="8" class="pl-0 body-1">
            {{name}}
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" align="center">
        <p class="mb-0 font-weight-lighter body-1">{{stock}}</p>
      </v-col>
      <v-col cols="2" align="center">
        <p class="mb-0 font-weight-medium body-1" >NT {{ formatPrice(price) }}</p>
      </v-col>
      <v-col cols="4" align="center" class="text-h6">
        <v-btn
          color="cyan accent-1"
          light
          font-weight-bold
          class="font-weight-bold mr-3"
          @click="edit_status()"
        >
          <v-icon left dense>mdi-pencil</v-icon>
          編輯
        </v-btn>
        <v-btn
          color="red accent-1"
          light
          font-weight-bold
          class="font-weight-bold ml-3"
          :disabled="bidding"
          @click="_delete()"
        >
        <v-icon left dense>
          mdi-delete
        </v-icon>
          刪除
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<style scoped>
  .centered-input >>> input {
    text-align: center
  }
</style>
<script>
  export default {
    name: 'cart_bar',
    data:()=>({
      delete:false,
    }),
    methods:{
      formatPrice(value) {
        let val = (value/1).toFixed(0)
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      edit_status(){
        this.$emit("return_edit",this.price,this.stock)
      },
      _delete(){
        this.$emit("return_delete")
      },
    },
    props:{
      img: Object,
      name: String,
      stock: Number,
      price: Number,   
      bidding: Boolean       
    },
    mounted(){
      //console.log(this.img)
    }
  }
</script>
<style scoped>
  .centered-input >>> input {
    text-align: center
  }
</style>