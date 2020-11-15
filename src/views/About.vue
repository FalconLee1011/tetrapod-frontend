<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn
      @click="clickButton('aaa')"
    >CLICK ME!!</v-btn>
  </div>
</template>


<script>
export default {
  data() {
    return {
      socket: undefined,
    }
  },
  methods: {
    clickButton: function (data) {
      // $socket is socket.io-client instance
      this.$socket.emit('emit_method', data)
    }
  },
  socket: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function () {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
}
</script>