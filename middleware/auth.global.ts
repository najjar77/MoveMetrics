// auth.global.ts
import {navigateTo} from '#app';
import {useAuth} from '~/composables/useAuth';

const {user} = useAuth();

export default defineNuxtRouteMiddleware((to, from) => {

    console.log("To: ", to);
    console.log("From: ", from);
    if (!user.value && to.path !== '/login') {
        return navigateTo('/login');
    } else if (user.value && to.path === '/login') {
        return navigateTo('/');
    }

})
