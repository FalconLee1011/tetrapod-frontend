<template>
  <v-card
    elevation="14"
    tile
    class="mx-10"
    max-width="1070"
    color="#282828"
  >
    <v-card-text>
      <v-divider></v-divider>
      <v-subheader>
        <v-row>
          <v-col cols="4">
          商品
          </v-col>
          <v-col cols="2" align="center">
          庫存
          </v-col>
          <v-col cols="2" align="center">
          單價
          </v-col>
          <v-col cols="4" align="center">
            操作
          </v-col>
        </v-row>
      </v-subheader>
      <v-divider></v-divider>
      <v-row>
        <v-col
          v-for="n in quantity"
          :key="n"
          cols=12
          class="py-0"
        >
          <managerbar
            :price=2424
            :stock=10
          ></managerbar>
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import managerbar from "./manager_bar.vue"
export default {
    name: 'cart_card',
    components: { managerbar, },
    data: () => ({
      
    }),
    props:{
      quantity:Number
    }
}
</script>
