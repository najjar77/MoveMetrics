<script setup lang="ts">
import {ref} from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {type WorkoutData} from "~/models/formData/workoutData"


const currentWorkoutSelection = ref<WorkoutData | null>(null);
const emits = defineEmits(['updateSelection']);

const props = defineProps({
  workouts: Array
});

watch(currentWorkoutSelection, (newSelection) => {
  emits('updateSelection', newSelection);
});

</script>

<template>
  <DataTable v-model:selection="currentWorkoutSelection" dataKey="id" :value="props.workouts" showGridlines
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
</template>

<style scoped>


</style>