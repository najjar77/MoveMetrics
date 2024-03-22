<script setup lang="ts">
import {
  deleteWorkoutData,
  fetchAndLogAllData,
  fetchWorkoutDataByUser,
  saveWorkoutDataByUserId,
  updateWorkoutData
} from "~/firebase/DBController";
import type {WorkoutData} from "~/models/formData/workoutData";
import {ref} from "vue";
import Toolbar from "primevue/toolbar";
import {useToast} from "primevue/usetoast";
import {useAuth} from "~/composables/useAuth";

const workouts = ref<WorkoutData[]>([]);
const currentWorkoutSelection = ref<WorkoutData | null>(null);
const isEditMode = ref(false);
const dataEntryFormVisible = ref(false);
const toast = useToast();
const buttonVisibility = computed(() => currentWorkoutSelection.value !== null);
const {user} = useAuth();

onMounted(async () => {
  if (user.value) {
    const data = await fetchWorkoutDataByUser(user.value.uid);
    workouts.value = data.map((workout) => ({
      ...workout,
      id: workout.id,
    }));
    console.log("Data presented: ", JSON.stringify(data))
  } else {
    console.log("No user logged in");
    //TODO: needs to be edited to something else cause it loads too fast and the user is not logged in.
  }
});

// For debug purposes
onMounted(() => {
  fetchAndLogAllData();
});

//refreshes the DataTable when new data is added or removed
async function refreshData() {
  if (user.value) {
    const data = await fetchWorkoutDataByUser(user.value.uid);
    workouts.value = data.map((workout) => ({
      ...workout,
      id: workout.id,
    }));
    currentWorkoutSelection.value = null;
  }
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
    toast.add({severity: 'success', summary: 'Success Message', detail: 'Workout added successfully', life: 5000});
  } else {
    toast.add({severity: 'success', summary: 'Update Message', detail: 'Workout updated successfully', life: 5000});
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

const submitData = async (workoutData: WorkoutData) => {
  try {
    const docId = await saveWorkoutDataByUserId(workoutData);
    console.log("Data saved with ID: ", docId);
    showSuccess();
    dataEntryFormVisible.value = false;
    await refreshData();
    console.log("Data saved: ", JSON.stringify(workoutData));

  } catch (error) {
    console.error("Failed to save data: ", error);
    showError();
    // Handle errors, e.g., showing an error message
  }
};

const submitUpdatedData = async (id: string, workoutData: WorkoutData) => {
  try {
    await updateWorkoutData(id, workoutData);
    console.log("Data updated successfully with ID: ", workoutData.id);
    showSuccess();
    await refreshData();
    dataEntryFormVisible.value = false;
  } catch (error) {
    console.error("Failed to update entry set: ", error)
    showError();
  }
}

</script>

<template>
  <div class="page-container">
    <DataEntryForm
      v-if="!isEditMode"
      v-model:visible="dataEntryFormVisible"
      :is-edit-mode="false"
      :prefilled-workout-data="currentWorkoutSelection"
      @data-saved="refreshData"
      @show-success="showSuccess"
      @show-error="showError"
      @submit-data="submitData"
      @submit-updated-data="submitUpdatedData"
    />
    <DataEntryForm
      v-else
      v-model:visible="dataEntryFormVisible"
      :is-edit-mode="true"
      :prefilled-workout-data="currentWorkoutSelection"
      @data-saved="refreshData"
      @show-success="showSuccess"
      @show-error="showError"
      @submit-data="submitData"
      @submit-updated-data="submitUpdatedData"
    />
    <div class="table-toolbar-container">
      <div class="toolbar-container">
        <Toolbar>
          <template #start>
            <Button
              class="toolbar-button"
              label="New"
              icon="pi pi-plus"
              @click="toggleDataEntryForm"
            />
            <Button
              class="toolbar-button"
              label="Edit"
              icon="pi pi-file-edit"
              severity="secondary"
              :disabled="!buttonVisibility"
              @click="openFormInEditMode"
            />
            <Button
              class="toolbar-button"
              label="Delete"
              icon="pi pi-trash"
              severity="danger"
              :disabled="!buttonVisibility"
              @click="deleteSelectedWorkout"
            />
            <Button
              class="toolbar-button"
              label="Refresh Table"
              icon="pi pi-undo"
              severity="info"
              @click="refreshData"
            />
          </template>
        </Toolbar>
      </div>
      <WorkoutDataTable
        v-model="currentWorkoutSelection"
        :workouts="workouts"
      />
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