// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        'nuxt-primevue'
    ],
    primevue: {
        components: {
            prefix: 'Prime',
            include: '*'
        },
        options: {
            ripple: true
        }
        ,
        cssLayerOrder: 'reset,primevue',
        usePrimeVue: true
    },
    css: ['primevue/resources/themes/aura-light-green/theme.css',
        'primevue/resources/primevue.min.css',
        'primeicons/primeicons.css'
    ]

});