<template>
  <div>
    <v-row>
    <v-col cols="1"> 
      <v-avatar color="primary" size="40" class="rounded-0">
        <img
          :src="blobLink"
        />
      </v-avatar>
    </v-col>

      <v-col cols="4">{{ name }}</v-col>

      <v-col cols="4" v-if="type == 'cart'">
        <countstepper
          :n=howmany
        ></countstepper>
      </v-col>

      <v-col cols="4" v-if="type != 'cart'">
        {{ howmany }}
      </v-col>

      <v-col cols="2">
        NT {{ price.toLocaleString() }}
      </v-col>

      <v-col cols="1">
        <v-btn @click="$emit('delete', idx)" icon> 
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-col> 
    </v-row>
    <v-divider></v-divider>
  </div>
</template>

<script>
import countstepper from "../misc/countstepper.vue";
import { mapActions } from "vuex";
export default {
  name: "cart_bar",
  components: { countstepper },
  props: {
    img: {
      type: Array,
      default: null,
    },
    name: {
      type: String,
      default: "",
    },
    howmany: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    idx: {
      type: Number,
      default: null,
    },
    type: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      blobLink: "",
      hasPic: false,
    }
  },
  async mounted() {
    if(this.img != null) { 
      this.blobLink = await this.generateBlob(this.img[0]); 
      this.hasPic = true;
    }else{
      this.hasPic = false;
    }
    console.log(this.howmany);
  },
  computed: {
    // blobLink(){
    //   // return this.generateBlob(image[0]);
    //   if(this.image == null) { return await this.generateBlob(this.image[0]); }
    //   return "https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"
    // }
  },
  methods: {
    ...mapActions(
      [
        "generateBlob"
      ]
    ),
  },
};
</script>
