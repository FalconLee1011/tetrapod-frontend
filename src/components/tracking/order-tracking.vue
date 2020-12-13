<template>
  <v-card
    class="mx-auto mt-5"
    max-width="70%"
  >
    <v-card-title>訂單追蹤</v-card-title>
    <v-card-subtitle>您的訂單</v-card-subtitle>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="orders"
      > 
        <template v-slot:item._price="{item}" >
          NT {{item.price.toLocaleString()}}
        </template>
        <template v-slot:item._state="{item}" >
          {{item.status}}
        </template>
        <template v-slot:item.act="{item}" >
          <v-btn :to="`/order-tracking/${item.id}`">
            詳細資訊
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  // merchant_id:"",
  // user_id:"",
  // status:"",
  // approve:"" 
  data() {
    return {
      headers:[
        {text: "賣家", value: "user_id"},
        {text: "訂單金額", value: "_price"},
        {text: "狀態", value: "_state"},
        {text: "管理", value: "act"}
      ],
      orders:[
        {
          user_id: "測試", 
          price: 9876, 
          status: "confirmed", 
          id: "c8763633636363636"
        },
        {
          user_id: "測試", 
          price: 9876, 
          status: "confirmed", 
          id: "c8763633636363633"
        },
      ]
    }
  },
  
}
</script>