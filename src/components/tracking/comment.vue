<template>
  <v-dialog
    v-model="trigger"
    scrollable 
    max-width="75%"
  >
  <v-card>
    <v-card-title primary-title>
      新增評價
    </v-card-title>
    <v-card-text>
      <v-card-title>各商品評價</v-card-title>
      <v-data-table
        :headers="headers"
        :items="merchants"
      >
        <template v-slot:item.rating=" { item } ">
          <v-row
            align="center"
            justify="center"
          >
            <v-col cols=4>
              <v-rating
                color="amber"
                half-increments
                v-model="rating.merchants[item._id].star"
              ></v-rating>
            </v-col>
            <v-col cols=8>
              <v-text-field 
                label="評論"
                v-model="rating.merchants[item._id].comments"
              />
            </v-col>
          </v-row>
        </template>
      </v-data-table>
      <v-divider />
      <v-row
        align="center"
        justify="center"
      >
        <v-col cols=2>
          <v-card-title>訂單總體評價</v-card-title>
        </v-col>
        <v-col cols=2>
          <v-rating
            color="amber"
            half-increments
            v-model="rating.overallstar"
          ></v-rating>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="submit">完成</v-btn>
    </v-card-actions>
  </v-card>
  </v-dialog>
</template>

<style scoped>
  .align-right{ text-align: right; }
  .done, .not-done {
    font-size: 110%;
    font-weight: 500;
  }
  .done{ color: white }
  .not-done { color: #666 }
</style>

<script>
// const API_PREFIX = process.env.VUE_APP_API_PREFIX;

export default {
  props:{
    headers: {
      type: Array, 
    },
    merchants: {
      type: Array, 
    },
  }, 
  data() {
    return {
      trigger: false, 
      rating: {
        merchants: {}, 
        overallstar: 5,
      }, 
    }
  },
  created() {
    for (var i in this.merchants) { 
      const merch = this.merchants[i];
      this.rating.merchants[merch._id] = { star: 5, comments: "" }; 
    }
  },
  methods: {
    interact(){ this.trigger = !this.trigger; },
    submit(){ 
      this.$emit('rate', this.rating);
      this.interact();
    }, 
  }, 
}
</script>