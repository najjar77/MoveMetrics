<script setup lang="ts">
import {ref} from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {deleteWorkoutData, fetchAndLogAllData, fetchWorkoutData} from "~/firebase/DBController";
import {type WorkoutData} from "~/models/formData/workoutData"
import Toolbar from "primevue/toolbar";


const workouts = ref<WorkoutData[]>([]);
const currentWorkoutSelection = ref<WorkoutData | null>(null);

const props = defineProps({
  workouts: Object,
  currentWorkoutSelection: Object
});

function formatDate(date: Date): string {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}


// TODO: Format the data to dd/mm/yyyy
// TODO: Add Remove and modify functionality to DataTable
onBeforeMount(async () => {
  const data = await fetchWorkoutData();
  //console.log('data => ', data)
  //@ts-ignore
  workouts.value = data.map((workout, index) => ({
    ...workout,
    id: workout.id,
    nr: index + 1,
    generalInformation: {
      ...workout.generalInformation,
      //@ts-ignore
      date: formatDate(workout.generalInformation.date)
    }

  }));
  // For Debugging purposes
  console.log(data);
});

onMounted(() => {
  fetchAndLogAllData();
});

const isEditMode = ref(false);
const dataEntryFormVisible = ref(false); // Controls the visibility of DataEntryForm
function toggleDataEntryForm() {
  isEditMode.value = false;
  dataEntryFormVisible.value = !dataEntryFormVisible.value;
}

//refreshes the DataTAble when new data is added or removed
async function refreshData() {
  const data = await fetchWorkoutData();
  //@ts-ignore
  workouts.value = data.map((workout, index) => ({
    ...workout,
    id: workout.id,
    nr: index + 1,
    generalInformation: {
      ...workout.generalInformation,
      //@ts-ignore
      date: formatDate(workout.generalInformation.date)
    }
  }));
}

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

async function openFormInEditMode() {
  if (currentWorkoutSelection.value) {
    try {
      dataEntryFormVisible.value = true;
      isEditMode.value = true;

      //await updateWorkoutData(currentWorkoutSelection.value.id);
      //await refreshData();
      // currentWorkoutSelection.value = null;
      console.log("Workout successfully edited");
    } catch (error) {
      console.error("Failed to edit workout:", error);
    }
  } else {
    console.log("No workout selected for deletion")
  }
}

watch(currentWorkoutSelection, (newValue) => {
  console.log(JSON.stringify(newValue))
})

</script>

<template>

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
          <Button class="toolbar-button" label="Refresh Table" icon="pi pi-undo" severity="info" @click="refreshData"/>
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