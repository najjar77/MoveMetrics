<script setup lang="ts">
import {useAuth} from "~/composables/useAuth";
import {loginWithGoogle, logout} from "~/firebase/authServices";

const {user} = useAuth();
</script>

<template>
  <div class="login-container">
    <div v-if="user">
      Signed in as : {{ user.displayName }}
      <Button
        label="Sign Out"
        @click="logout"
      />
    </div>
    <div v-else>
      <Button
        label="login with Google"
        @click="loginWithGoogle"
      />
    </div>
  </div>
</template>

<style scoped>
.login-container {
  margin: auto;
  width: 50%;
  padding: 10px;
}

</style>