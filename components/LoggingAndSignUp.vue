<script setup lang="ts">
import {useAuth} from "~/composables/useAuth";
import {loginWithGoogle, logoutFromGoogle} from "~/firebase/authServices";

const {user} = useAuth();
</script>

<template>
  <div>
    <div v-if="user">
      <Button
        label="Sign Out"
        severity="secondary"
        @click="logoutFromGoogle"
      />
    </div>
    <div v-else>
      <Button
        label="login"
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