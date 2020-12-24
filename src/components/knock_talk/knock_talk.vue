<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="red lighten-2"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Click Me
      </v-btn>
    </template>
    <v-card
      max-width="800"
      class="mx-auto pb-4 scroll_disable"
      elevation="0" 
    >
      <v-card-title class="justify-center">
        <h3 class="font-weight-medium">敲!</h3>
      </v-card-title>
      <v-card
        elevation="24" 
        class="mx-5 px-1" 
        height="500"
      >
        <v-row >
          <v-col cols="3" class="pt-0 px-2">
            <v-list-item-group vertical v-model="tab" mandatory>
              <v-card class="mx-0" elevation="24" height="500">
                <v-list-item
                  v-for="item in items"
                  :key="item.id"
                  class="tile mb-1"
                >
                  {{item.name}}
                </v-list-item>
              </v-card>
            </v-list-item-group>
          </v-col>
          <v-col cols="9" class="pt-0 px-2" >                    
            <v-card height="430" elevation-24 class="scroll_able">
              <v-tabs-items v-model="tab" vertical>  
                <v-tab-item
                  v-for="item in items"
                  :key="item.id"
                  transition="fade-transition"
                  reverse-transition="fade-transition"
                >
                  <v-textarea
                    readonly
                    v-model="item.message"
                    v-for="item in show_message"
                    :key="item.id"
                    rounded
                    filled
                    class="mb-0"
                    :class="{'ml-auto':item.from_user_or_not}"
                    max-length="50"
                    rows="1"
                    auto-grow
                    dense
                    style="max-width:250px;"
                  >
                </v-textarea>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
            <v-footer height="70">
              <v-text-field
                class="pt-2"
                v-on:keyup.enter="sendMessage"
                height="45"
                v-model="input_message"
                :append-outer-icon="input_message ? 'mdi-send' : ''"
                filled
                clear-icon="mdi-close-circle"
                clearable
                label="Message"
                type="text"
                transition="fade-transition"
                @click:append-outer="sendMessage"
                @click:clear="clearMessage">
              </v-text-field>
            </v-footer>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </v-dialog>
  
</template>
<script>
  //import movable from "v-movable";
  //Vue.use(movable);
  export default {
    //components:{movable},
    data:()=>({
      from_user:true,
      dialog:false,
      model:null,
      tab:null,
      items:[
        {name:"Andy000002"},
        {name:"FalconLee1011"},
        {name:"321"}
      ],
      message_list:[
        {id:0,from_id:0,message:"我的物理課本序號呢？！",from_user_or_not:true},
        {id:0,from_id:0,message:"你的的課本序號呢？！",from_user_or_not:false},
        {id:2,from_id:1,message:"你誰？",from_user_or_not:false},
        {id:3,from_id:2,message:"我是誰？",from_user_or_not:false},
      ],
      next_messagID:4,
      input_message:'Hey!',
    }),
    methods:{
      sendMessage () {
        this.add_message()
        this.clearMessage()
      },
      clearMessage () {
        this.input_message = ''
      },
      add_message(){
        if(this.input_message!=''){
          this.message_list.push({
            id:this.next_messagID++,
            from_id:this.tab,
            message:this.input_message,
            from_user_or_not:true,
          })
        }
      },
      
    },
    computed:{
      show_message(){
        return this.message_list.filter(item=>{
          if(item.from_id === this.tab)
            return true
          else
            return false
        })
      }
    },
  }
</script>
<style>
  .tile{
    background:#363636;
  }
  .v-tab {
    text-transform: none !important;
  }
  .scroll_disable{
    overflow: hidden
  }
  .scroll_able{
    overflow: auto;
  }
  .user_text{

  }

</style>