<script setup lang="ts">
import { deleteWorkoutData, fetchAndLogAllData, fetchWorkoutData } from "~/firebase/DBController";
import type { WorkoutData } from "~/models/formData/workoutData";
import { ref } from "vue";
import Toolbar from "primevue/toolbar";
import { useToast } from "primevue/usetoast";

const workouts = ref<WorkoutData[]>([]);
const currentWorkoutSelection = ref<WorkoutData | null>(null);
const isEditMode = ref(false);
const dataEntryFormVisible = ref(false);
const toast = useToast();
const buttonVisibility = computed(() => currentWorkoutSelection.value !== null);

onBeforeMount(async () => {
  const data = await fetchWorkoutData();
  //console.log('data => ', data)
  //@ts-ignore
  workouts.value = data.map((workout, index) => ({
    ...workout,
    id: workout.id,
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
  }));
  currentWorkoutSelection.value = null;

}

// deletes the current selected workout
async function deleteSelectedWorkout() {
  if (currentWorkoutSelection.value) {
    try {
      //@ts-ignore
      await deleteWorkoutData(currentWorkoutSelection.value.id);
      await refreshData();
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

//TODO: needs to be edited
async function openFormInEditMode() {
  if (currentWorkoutSelection.value) {
    try {
      dataEntryFormVisible.value = true;
      isEditMode.value = true;
    } catch (error) {
      console.error("Failed to edit workout:", error);
    }
  } else {
    console.log("No workout selected for deletion")
  }
}


// for debugging purposes
watch(currentWorkoutSelection, (newValue) => {
  console.log(JSON.stringify(newValue))
})

const showSuccess = () => {
  if (isEditMode.value === false) {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Workout added successfully', life: 5000 });
  } else {
    toast.add({ severity: 'success', summary: 'Update Message', detail: 'Workout updated successfully', life: 5000 });
  }
};
const showError = () => {
  toast.add({
    severity: 'error',
    summary: 'Missing Data',
    detail: 'Please fill out the mandatory fields',
    life: 5000
  });
};

function buttonVisibilityChecker() {

}

</script>

<template>

  <div class="page-container">
    <DataEntryForm v-if="!isEditMode" v-model:visible="dataEntryFormVisible" :isEditMode="false"
      @dataSaved="refreshData" :prefilledWorkoutData="currentWorkoutSelection" @showSuccess="showSuccess"
      @showError="showError" />
    <DataEntryForm v-else v-model:visible="dataEntryFormVisible" :isEditMode="true" @dataSaved="refreshData"
      :prefilledWorkoutData="currentWorkoutSelection" @showSuccess="showSuccess" @showError="showError" />
    <div class="table-toolbar-container">
      <div class="toolbar-container">
        <Toolbar>
          <template #start>
            <Button class="toolbar-button" label="New" icon="pi pi-plus" @click="toggleDataEntryForm" />
            <Button class="toolbar-button" label="Edit" icon="pi pi-file-edit" severity="secondary"
              @click="openFormInEditMode" :disabled="!buttonVisibility" />
            <Button class="toolbar-button" label="Delete" icon="pi pi-trash" severity="danger"
              @click="deleteSelectedWorkout" :disabled="!buttonVisibility" />
            <Button class="toolbar-button" label="Refresh Table" icon="pi pi-undo" severity="info"
              @click="refreshData" />
          </template>
        </Toolbar>
      </div>
      <WorkoutDataTable :workouts="workouts" v-model="currentWorkoutSelection" />
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  /* Center horizontally */
  align-items: center;
  /* Center vertically */
  height: calc(2vh - var(--top-toolbar-height));
  /* Adjust height based on the toolbar height */
  padding-top: var(--top-toolbar-height);
  /* If toolbar is fixed at the top */
}

:root {
  --top-toolbar-height: 60px;
  /* Example: Adjust this value to match your TopToolbar's height */
}

.table-toolbar-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  /* Ensures children (toolbar and table) fill the container */
}

.custom-table-Design {
  width: 100%
}

.toolbar-container {
  margin-bottom: 10px;
  /* Space between the toolbar and the DataTable */
}

.toolbar-button:not(:last-child) {
  margin-right: 10px;
  /* Adjust the space as needed */
}
</style>