<template>
  <v-card max-width="60%" class="mx-auto mt-5 pa-6 px-2">
    <v-card-title>
      <h2 style="font-weight: lighter;" class="px-4">
        賣場商品管理
        <v-btn icon>
          <v-icon large>mdi-briefcase-upload-outline</v-icon>
        </v-btn>
      </h2>
    </v-card-title>
    <v-tabs
      v-model="tab"
      align-with-title
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab
        v-for="item in items_name"
        :key="item.tab"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in 1"
        :key="item.tab"
      >
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
            <v-container>
              <v-row>
                <v-col
                  v-for="(n,index) in items"
                  :key="index"
                  cols=12
                  class="py-0"
                >
                  <managerbar
                    :key=index
                    :price=n.price
                    :stock=n.count
                    :name=n.merchant_name
                    :img=n.photo[0]
                    :bidding=n.is_bidding
                    @return_delete="_delete(items,index)"
                    @return_edit="_edit(arguments,items,index)"
                  ></managerbar>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
  // import manager_card from "./pro_manager/manager_card.vue";
  import managerbar from "./pro_manager/manager_bar.vue"
  const API_PREFIX = process.env.VUE_APP_API_PREFIX;
  export default {
    components: { managerbar, },
    data(){
      return{
        tab:null,
        items_name:[
          '已上架商品'
        ],
        items:[{}],
        //_key:[1,2]
      }
    },
    methods:{
      async _delete(array,index){
        console.log(array[index]._id)
        try{
          const res = await this.$axios.post(
            `${API_PREFIX}/merchant/delete_merchant`,
            {
              merchant_id:array[index]._id,
            },
            {
              headers:{
                token: this.$store.getters.token
              },
            },
          );
          this.$swal({
            title:"商品刪除成功!",
            icon: "success",
            showConfirmButton:false,
            timer:3000,
          }).then(()=>{
            parent.location.reload();
            console.log(res);
          });
        } catch(error){
          this.$swal({
            title: "刪除失敗！",
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            console.log(error)
          });
        }
      },
      async _edit(value,array,index){
        const data = new FormData();
        data.append('merchant_id',array[index]._id);
        this.$router.push({
          name:"edit",
          params:{
            merchant_id:array[index]._id,
          }
        })
      },
      async fetchMerchant(){
        let user = window.localStorage.getItem('account');
        const merchant = await this.$axios.post(
          `${API_PREFIX}/merchant/get`,
          {
            query:{
              "account":user,
            }
          }
        )
        this.items = merchant.data.merchants;
      },
    },
    async mounted(){
      await this.fetchMerchant();
    }
  }
</script>