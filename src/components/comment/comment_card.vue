<template>
  <v-card color="#282828" elevation="5" class="ma-3">
    <v-row>
      <v-col cols=1 class="ma-4 mr-0 pa-1">
        <v-img
          style="border-radius: 50%;"
          max-height="3.5em"
          max-width="3.5em"
          :src=url
        ></v-img>
      </v-col>
      <v-col col=11 class="ml-0 pa-0">
        <v-card-title class="py-0 mt-5">
          {{buyer}}
        </v-card-title>
        <v-rating
            :value=comment_star
            color="amber"
            readonly
            dense
            class="mx-4"
            half-increments
            size="20"
          ></v-rating>
        <v-card-text >
          {{text}}
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>
  
<script>
export default {
  props:{
    buyer:String,
    comment_star:Number,
    text:String,
    url:String
}
}
</script>