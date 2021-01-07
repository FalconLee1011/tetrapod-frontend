<template>
  <div>
    <v-list-item>
      <v-list-item-avatar color="primary" size="40" class="rounded-0">
        <img
          :src="blobLink"
        />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ name }}</v-list-item-title>
      </v-list-item-content>

      <v-list-item-content v-if="type == 'cart'">
        <v-list-item-title><countstepper
          :n=howmany
        ></countstepper></v-list-item-title>
      </v-list-item-content>

      <v-list-item-content v-if="type != 'cart'">
        <v-list-item-title>{{ howmany }}</v-list-item-title>
      </v-list-item-content>

      <v-list-item-content>
        <v-list-item-title>NT {{ price.toLocaleString() }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
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
