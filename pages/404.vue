<script setup lang="ts">

const router = useRouter();
const GoToDashboard = () => {
  router.push('/');
}

const GoOnePageBack = () => {
  router.go(-1);
}
</script>

<template>
  <div>
    <h1>Page ot found 404</h1>
    <Button
      label="Back to Dashboard"
      @click="GoToDashboard"
    />
    <Button
      label="Back to last Page"
      @click="GoOnePageBack"
    />
  </div>
</template>

<style scoped>

</style>