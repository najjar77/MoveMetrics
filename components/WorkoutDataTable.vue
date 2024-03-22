<script setup lang="ts">
import {type PropType} from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {type WorkoutData} from "~/models/formData/workoutData"

const emits = defineEmits(['updateSelection']);

const props = defineProps({
  workouts: Array
});
const currentWorkoutSelection = defineModel({
  type: Object as PropType<WorkoutData | null>,
})

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit'};
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', options).format(date) + ' ' + date.toTimeString().slice(0, 5);
}

</script>

<template>
  <DataTable
    v-model:selection="currentWorkoutSelection"
    data-key="id"
    :value="props.workouts"
    show-gridlines
    class="custom-table-Design"
    resizable-columns
    column-resize-mode="fit"
  >
    <Column
      selection-mode="single"
      header-style="width: 3rem"
    />
    <Column
      header="Nr"
      style="width: 5%"
    >
      <template #body="{ index }">
        {{ index + 1 }}
      </template>
    </Column>
    <Column
      field="generalInformation.date"
      header="Date"
      sortable
      style="width: 30%"
    >
      <template #body="slotProps">
        {{ formatDate(slotProps.data.generalInformation.date) }}
      </template>
    </Column>
    <Column
      field="generalInformation.name"
      header="Name"
      sortable
      style="width: 30%"
    />

    <Column
      field="suppIntakeInfo.creatin"
      header="Creatin"
      style="width: 5%"
    />
    <Column
      field="suppIntakeInfo.creatinAmount"
      header="gr"
      style="width: 2%"
    />
    <Column
      field="suppIntakeInfo.eaa"
      header="EAA"
      style="width: 5%"
    />
    <Column
      field="suppIntakeInfo.eaaAmount"
      header="gr"
      style="width: 2%"
    />
    <Column
      field="suppIntakeInfo.protein"
      header="Protein"
      style="width: 5%"
    />
    <Column
      field="suppIntakeInfo.proteinAmount"
      header="gr"
      style="width: 2%"
    />
  </DataTable>
</template>

<style scoped></style>