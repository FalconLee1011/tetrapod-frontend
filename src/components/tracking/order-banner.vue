<template>
  <v-card>
    <v-card-title primary-title>
      訂單追蹤
    </v-card-title>
    <v-card-text>
      <v-data-table
        headers="headers"
        items="orders"
      >
        
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
        {text: "訂單金額", value: "price"},
        {text: "狀態", value: "state"},
        {text: "管理", value: "act"}
      ],
      orders:[
        {
          user_id: "測試", 
          price: 9876, 
          state: "confirmed", 
        },
        {
          user_id: "測試2", 
          price: 5432, 
          state: "confirmed", 
        }
      ]
    }
  },
  
}
</script>