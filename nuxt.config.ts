// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-primevue'
  ],
  primevue: {
    components:{
      include:['Button','DataTable']
    }
  },
  css:[
    'primevue/resources/themes/aura-light-blue/theme.css',
      'primeicons/primeicons.css'
  ]

})
