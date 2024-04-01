<script setup lang="ts"></script>

<template>
  <div>
    <TopToolbar />
    <div class="page-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.page-content {
  padding: 20px;
}
</style>
