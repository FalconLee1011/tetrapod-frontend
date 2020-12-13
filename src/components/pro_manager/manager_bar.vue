<template>
  <v-card color="#282828" elevation="0">
    <v-row justify="center" align="center">
      <v-col cols="4">
        <v-row align="center">
          <v-col cols="4" class="py-0">
            <v-img max-height="5em" max-width="5em" src="https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png">
            </v-img>
          </v-col>
          <v-col cols="8" class="pl-0 body-1">
            商品名稱
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" align="center">
        <p v-if="edit===false" class="mb-0 font-weight-lighter body-1">{{stock}}</p>
        <v-text-field
          justify="center"
          v-model="stock"
          v-if="edit===true"
          class="centered-input"
        ></v-text-field>
      </v-col>
      <v-col cols="2" align="center">
        <p v-if="edit===false" class="mb-0 font-weight-medium body-1" >NT {{ formatPrice(price) }}</p>
        <v-text-field
          justify="center"
          v-model="price"
          v-if="edit===true"
          class="centered-input"
        ></v-text-field>
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
          @click="del='true'"
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
      edit:false,
      delete:false
    }),
    methods:{
      formatPrice(value) {
        let val = (value/1).toFixed(0)
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      edit_status(){
        if(this.edit === false)
          this.edit=true;
        else
          this.edit=false;

      }
    },
    watch:{

    },
    props:{
      img: String,
      name: String,
      stock: Number,
      price: Number,          
    }
  }
</script>
<style scoped>
  .centered-input >>> input {
    text-align: center
  }
</style>