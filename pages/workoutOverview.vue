<script setup lang="ts">
import {fetchWorkoutData} from "~/firebase/DBController";
import type {WorkoutData} from "~/models/formData/workoutData";
import {ref} from "vue";

const workouts = ref<WorkoutData[]>([]);
const currentWorkoutSelection = ref<WorkoutData | null>(null);


//refreshes the DataTAble when new data is added or removed
async function refreshData() {
  const data = await fetchWorkoutData();
  workouts.value = data.map((workout, index) => ({
    ...workout,
    id: workout.id,
    nr: index + 1
  }));
}


</script>

<template>

  <div class="page-container">
    <DataEntryForm/>
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