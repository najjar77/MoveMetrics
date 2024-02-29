<script setup lang="ts">
import {deleteWorkoutData, fetchAndLogAllData, fetchWorkoutData} from "~/firebase/DBController";
import type {WorkoutData} from "~/models/formData/workoutData";
import {ref} from "vue";
import Toolbar from "primevue/toolbar";

const workouts = ref<WorkoutData[]>([]);
const currentWorkoutSelection = ref<WorkoutData | null>(null);
const isEditMode = ref(false);
const dataEntryFormVisible = ref(false);


onBeforeMount(async () => {
  const data = await fetchWorkoutData();
  //console.log('data => ', data)
  //@ts-ignore
  workouts.value = data.map((workout, index) => ({
    ...workout,
    id: workout.id,
    nr: index + 1
  }));
  // For Debugging purposes
  console.log(data);
});

// For debug purposes
onMounted(() => {
  fetchAndLogAllData();
});

//refreshes the DataTable when new data is added or removed
async function refreshData() {
  const data = await fetchWorkoutData();
  //@ts-ignore
  workouts.value = data.map((workout, index) => ({
    ...workout,
    id: workout.id,
    nr: index + 1
  }));

}

// deletes the current selected workout
async function deleteSelectedWorkout() {
  if (currentWorkoutSelection.value) {
    try {
      //@ts-ignore
      await deleteWorkoutData(currentWorkoutSelection.value.id);
      await refreshData();
      currentWorkoutSelection.value = null;
      console.log("Workout successfully deleted");
    } catch (error) {
      console.error("Failed to delete workout:", error);
    }
  } else {
    console.log("No workout selected for deletion");
  }
}

// formates the date to dd/mm/yyy
function formatDate(date: Date): string {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function toggleDataEntryForm() {
  isEditMode.value = false;
  dataEntryFormVisible.value = !dataEntryFormVisible.value;
}

async function openFormInEditMode() {
  if (currentWorkoutSelection.value) {
    try {
      dataEntryFormVisible.value = true;
      isEditMode.value = true;
      await refreshData();
      currentWorkoutSelection.value = null;
      console.log("Workout successfully edited");
    } catch (error) {
      console.error("Failed to edit workout:", error);
    }
  } else {
    console.log("No workout selected for deletion")
  }
}

function updateCurrentSelection(selectedWorkout: WorkoutData) {
  currentWorkoutSelection.value = selectedWorkout;
}

// for debugging purposes
watch(currentWorkoutSelection, (newValue) => {
  console.log(JSON.stringify(newValue))
})

</script>

<template>

  <div class="page-container">
    <DataEntryForm v-if="!isEditMode" v-model:visible="dataEntryFormVisible" :isEditMode="false"
                   @dataSaved="refreshData" :prefilledWorkoutData="currentWorkoutSelection"/>
    <DataEntryForm v-else v-model:visible="dataEntryFormVisible" :isEditMode="true"
                   @dataSaved="refreshData" :prefilledWorkoutData="currentWorkoutSelection"/>
    <div class="table-toolbar-container">
      <div class="toolbar-container">
        <Toolbar>
          <template #start>
            <Button class="toolbar-button" label="New" icon="pi pi-plus" @click="toggleDataEntryForm"/>
            <Button class="toolbar-button" label="Edit" icon="pi pi-file-edit" severity="secondary"
                    @click="openFormInEditMode"/>
            <Button class="toolbar-button" label="Delete" icon="pi pi-trash" severity="danger"
                    @click="deleteSelectedWorkout"/>
            <Button class="toolbar-button" label="Refresh Table" icon="pi pi-undo" severity="info"
                    @click="refreshData"/>
          </template>
        </Toolbar>
      </div>
      <WorkoutDataTable :workouts="workouts" @updateSelection="updateCurrentSelection"/>
    </div>
  </div>
</template>

<style scoped>


.page-container {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: calc(2vh - var(--top-toolbar-height)); /* Adjust height based on the toolbar height */
  padding-top: var(--top-toolbar-height); /* If toolbar is fixed at the top */
}

:root {
  --top-toolbar-height: 60px; /* Example: Adjust this value to match your TopToolbar's height */
}

.table-toolbar-container {
  display: flex;
  flex-direction: column;
  align-items: stretch; /* Ensures children (toolbar and table) fill the container */
}

.custom-table-Design {
  width: 100%
}

.toolbar-container {
  margin-bottom: 10px; /* Space between the toolbar and the DataTable */
}

.toolbar-button:not(:last-child) {
  margin-right: 10px; /* Adjust the space as needed */
}

</style>