<script setup lang="ts">
import {ref} from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {fetchAndLogAllData, fetchWorkoutData} from "~/firebase/DBController";
import {type WorkoutData} from "~/models/formData/workoutData"
import Toolbar from "primevue/toolbar";

const workouts = ref<WorkoutData[]>([]);
const currentWorkoutSelection = ref<WorkoutData[]>([]);


// TODO: Format the data to dd/mm/yyyy
// TODO: Add Remove and modify functionality to DataTable
onMounted(async () => {
  const data = await fetchWorkoutData();
  // Add row numbers (nr)
  workouts.value = data.map((workout, index) => ({
    ...workout,
    id: workout.id,
    nr: index + 1 // Assuming you want numbering to start at 1
  }));
  // For Debugging purposes
  //console.log(data);
});

onMounted(() => {
  fetchAndLogAllData();
});


// Computed property to get the selected workout
const selectedWorkout = computed(() => currentWorkoutSelection.value[0]);

// Example usage within a component method
function logSelectedWorkout(event: string) {
  if (selectedWorkout.value) {
    console.log("Selected Workout: ", selectedWorkout.value);
  } else {
    console.log("No workout selected");
  }
}

const dataEntryFormVisible = ref(false); // Controls the visibility of DataEntryForm
function toggleDataEntryForm() {
  dataEntryFormVisible.value = !dataEntryFormVisible.value;
}

// Changes the dataEntryForm Dialog visibility variable
function onDataEntryFormClosed(visible: boolean) {
  console.log('Dialog closed with visibility:', visible);
  dataEntryFormVisible.value = visible;
}

//refreshes the DataTAble when new data is added or removed
async function refreshData() {
  const data = await fetchWorkoutData();
  workouts.value = data.map((workout, index) => ({
    ...workout,
    id: workout.id,
    nr: index + 1
  }));
}

//TODO: the awiat delete section musst be edited
// Funktion zum Löschen des ausgewählten Workouts
async function deleteSelectedWorkout() {
  if (selectedWorkout.value) {
    try {
      //await deleteWorkoutData(selectedWorkout.value.id);
      await refreshData();
      console.log("Workout successfully deleted");
    } catch (error) {
      console.error("Failed to delete workout:", error);
    }
  } else {
    console.log("No workout selected for deletion");
  }
}

</script>

<template>

  <DataEntryForm v-model:visible="dataEntryFormVisible" @update:visible="onDataEntryFormClosed"
                 @data-saved="refreshData"/>


  <div class="table-toolbar-container">
    <div class="toolbar-container">
      <Toolbar>
        <template #start>
          <Button class="toolbar-button" label="New" icon="pi pi-plus" @click="toggleDataEntryForm"/>
          <Button class="toolbar-button" label="Edit" icon="pi pi-file-edit" severity="secondary"/>
          <Button class="toolbar-button" label="Delete" icon="pi pi-trash" severity="danger"
                  @click="deleteSelectedWorkout"/>
          <Button class="toolbar-button" label="Refresh Table" icon="pi pi-undo" severity="info"/>
        </template>
      </Toolbar>
    </div>
    <DataTable v-model:selection="currentWorkoutSelection" dataKey="nr" :value="workouts" showGridlines
               class="custom-table-Design" resizableColumns columnResizeMode="fit">
      <Column selectionMode="single" headerStyle="width: 3rem"></Column>
      <Column field="nr" header="Nr" style="width: 10%"></Column>
      <Column field="generalInformation.date" header="Date" sortable style="width: 30%"/>
      <Column field="generalInformation.name" header="Name" sortable style="width: 30%"/>
      <Column field="suppIntakeInfo.bcaa" header="BCAA" style="width: 5%"/>
      <Column field="suppIntakeInfo.bcaaAmount" header="gr" style="width: 2%"/>
      <Column field="suppIntakeInfo.creatin" header="Creatin" style="width: 5%"/>
      <Column field="suppIntakeInfo.creatinAmount" header="gr" style="width: 2%"/>
      <Column field="suppIntakeInfo.eaa" header="EAA" style="width: 5%"/>
      <Column field="suppIntakeInfo.eaaAmount" header="gr" style="width: 2%"/>
      <Column field="suppIntakeInfo.protein" header="Protein" style="width: 5%"/>
      <Column field="suppIntakeInfo.proteinAmount" header="gr" style="width: 2%"/>
    </DataTable>
  </div>
</template>

<style scoped>
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