// auth.global.ts
import { navigateTo } from "#app";
import { useAuth } from "~/composables/useAuth";

const { user, isAuthCheckComplete } = useAuth();

export default defineNuxtRouteMiddleware(async (to, from) => {
  //console.log("To: ", to);
  //console.log("From: ", from);
  //console.log("User: ", user.value);
  console.log("isAuthCheckComplete: ", isAuthCheckComplete.value);

  if (user.value) {
    if (to.path === "/login") {
      return navigateTo("/");
    }
    return;
  }
  if (!user.value && to.path !== "/login") {
    console.log("Redirecting to login");
    return navigateTo("/login");
  }
});
