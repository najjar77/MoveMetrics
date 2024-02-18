<script setup lang="ts">
import {ref} from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {fetchAndLogAllData, fetchWorkoutData} from "~/firebase/DBController";
import {type WorkoutData} from "~/models/formData/workoutData"

const workouts = ref<WorkoutData[]>([]);
const selectedWorkouts = ref<WorkoutData[]>([]);

// TODO: Format the data to dd/mm/yyyy
// TODO: Add Remove and modify functionality to DataTable
onMounted(async () => {
  const data = await fetchWorkoutData();
  // Add row numbers (nr)
  workouts.value = data.map((workout, index) => ({
    ...workout,
    nr: index + 1 // Assuming you want numbering to start at 1
  }));
  // For Debugging purposes
  console.log(data);
});

onMounted(() => {
  fetchAndLogAllData();
});

</script>

<template>
  <DataTable v-model:selection="selectedWorkouts" :value="workouts" dataKey="nr"
             class="custom-table-Design">
    <Column selectionMode="single" headerStyle="width: 3rem"></Column>
    <Column field="nr" header="Nr" style="width: 10%"></Column>
    <Column field="generalInformation.date" header="Date" sortable style="width: 30%"></Column>
    <Column field="generalInformation.name" header="Name" sortable style="width: 30%"></Column>
    <Column field="suppIntakeInfo.bcaa" header="BCAA" style="width: 5%"></Column>
    <Column field="suppIntakeInfo.bcaaAmount" header="gr" style="width: 2%"></Column>
    <Column field="suppIntakeInfo.creatin" header="Creatin" style="width: 5%"></Column>
    <Column field="suppIntakeInfo.creatinAmount" header="gr" style="width: 2%"></Column>
    <Column field="suppIntakeInfo.eaa" header="EAA" style="width: 5%"></Column>
    <Column field="suppIntakeInfo.eaaAmount" header="gr" style="width: 2%"></Column>
    <Column field="suppIntakeInfo.protein" header="Protein" style="width: 5%"></Column>
    <Column field="suppIntakeInfo.proteinAmount" header="gr" style="width: 2%"></Column>

  </DataTable>
</template>

<style scoped>
.custom-table-Design {
  width: 90rem;
}

</style>