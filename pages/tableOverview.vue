<script setup lang="ts">
import Dialog from 'primevue/dialog';
</script>

<template>
  <Dialog>

  </Dialog>
  <div class="page-container">
    <WorkoutDataTable/>
  </div>
</template>

<style scoped>
/* Ensure the parent container (could be NuxtPage or a specific div around WorkoutDataTable)
   is styled to fill the available space minus the TopToolbar height and centered */
.page-container {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: calc(200vh - var(--top-toolbar-height)); /* Adjust height based on the toolbar height */
  padding-top: var(--top-toolbar-height); /* If toolbar is fixed at the top */
}

/* Optional: if you know the exact height of your TopToolbar, replace var(--top-toolbar-height) with that value */
:root {
  --top-toolbar-height: 60px; /* Example: Adjust this value to match your TopToolbar's height */
}
</style>