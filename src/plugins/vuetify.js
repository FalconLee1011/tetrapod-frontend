import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: { 
    dark: true,
    themes:{
      dark:{
        primary: '#BB86FC',
        secondary: '#03DAC5',
        accent: '#82B1FF',
        error: '#CF6679',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      }
    }
  },
})
