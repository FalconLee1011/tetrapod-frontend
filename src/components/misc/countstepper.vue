<template>
<div style="border: 1px solid gray;width:100px;border-radius: 5px;">
    <button style="width:40px;font-size:large;" :disabled="isButtonDisabled" @click="n -= 1">-</button>{{n}}<button style="width:40px;font-size:large;" @click="n += 1">+</button>
</div>
</template>

<script>
  export default {
      name: 'countstepper',
      props:{howmany:Number,},
      data: () => ({
      n:1,
      }),
      computed:{
        isButtonDisabled() {
          return this.n==1;
          }
      },
  }
</script>
