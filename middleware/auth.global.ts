// auth.global.ts
import {navigateTo} from '#app';

const isLoggedIn = false;

export default defineNuxtRouteMiddleware((to, from) => {
    console.log("To: ", to);
    console.log("From: ", from);
    if (isLoggedIn) {
        return navigateTo('/dashboard');
    }
})
