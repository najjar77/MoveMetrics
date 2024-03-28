// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        '@nuxtjs/eslint-module',
        'nuxt-primevue',
        '@vee-validate/nuxt',
    ],
    veeValidate: {
        autoImports: true,
        componentNames: {
            Form: 'VeeForm',
            Field: 'VeeField',
            FieldArray: 'VeeFieldArray',
            ErrorMessage: 'VeeErrorMessage',
        },
    },
    primevue: {
        components: {
            include: ['Button', 'DataTable', 'Sidebar', 'Menu', 'Divider', 'Calendar', 'Dropdown', 'InputText']
        }
    },
    css: [
        'primevue/resources/themes/aura-light-blue/theme.css',
        'primeicons/primeicons.css'
    ]
})
