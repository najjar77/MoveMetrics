<script setup lang="ts">
import {GoogleAuthProvider, signInWithPopup} from "@firebase/auth";
import {auth} from "~/firebase/init";

const handleGoogle = (e: Event) => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

</script>

<template>
  <Button
    label="login with Google"
    @click="handleGoogle"
  />
</template>

<style scoped>

</style>