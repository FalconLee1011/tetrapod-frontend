<template>
  <v-card elevation="14" tile class="mx-auto" max-width="700">
    <v-card-text>
      {{ name }}
      <v-divider></v-divider>
      <v-subheader>
        <v-row>
          <v-col cols="5"> 商品 </v-col>
          <v-col cols="4"> 數量 </v-col>
          <v-col cols="3"> 金額 </v-col>
        </v-row>
      </v-subheader>
      <v-divider></v-divider>
      <p
        v-for="(merchant, idx) in merchants"
        :key="`${idx}_merchant_for${name}`"
      >
        <cartbar 
          type="cart"
          :img="merchant.photo"
          :name="merchant.merchant_name"
          :howmany="merchant.merchant_count"
          :price="merchant.price"
          :idx="idx"
          v-on:delete="deleteMerchant($event)"
        />
      </p>
      <div style="position: absolute; right: 100px; font-weight: bold">
        總金額<span style="font-size: 200%"> NT {{ total }}</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="checkout" color="primary" style="color: black"> 結帳 </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import cartbar from "./cart_bar.vue";
import { mapActions } from "vuex";

const API_PREFIX = process.env.VUE_APP_API_PREFIX;
export default {
  name: "cart_card",
  components: { cartbar },
  data: () => ({
    items: 3,
  }),
  props: {
    name: String,
    merchants: Array,
    total: Number
  },
  methods: {
    ...mapActions(
      [
        "generateBlob"
      ]
    ),
    checkout(){
      this.$router.push(`/checkout/${this.name}`);
    },
    async deleteMerchant(e){
      console.log(this.merchants[e].merchant_id);
      try{
        const res = await this.$axios.post(
        `${API_PREFIX}/merchant/delete_cart`,
        {
          merchant_id:this.merchants[e].merchant_id
        },
        {
          headers:{
            token: this.$store.getters.token
          }
        }
      );
      this.$emit('refresh');
      this.$swal({
          title: "刪除成功！",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          console.log(res);
        });
      }catch(error){
        console.log(error);
        this.$swal({
          title: "刪除失敗！",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        })
      }
      
    }
  },
};
</script>
