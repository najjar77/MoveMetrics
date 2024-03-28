<script setup lang="ts">
import Calendar from "primevue/calendar";
import 'primeicons/primeicons.css';
import MultiSelect from 'primevue/multiselect';
import type {GeneralInformation} from "~/models/formData/generalInformation";

const props = defineProps<{
  generalInformation: GeneralInformation
}>();

const isVeeFieldValid = ref(true)
const emits = defineEmits(['update:generalInformation']);

// Define the options for the dropdown
const activityOptions = [
  {name: 'Bouldering', value: 'Bouldering', icon: 'pi pi-mountain'},
  {name: 'Cycling', value: 'Cycling', icon: 'pi pi-bicycle'},
  {name: 'Gym', value: 'Gym', icon: 'pi pi-dumbbell'},
  {name: 'Swimming', value: 'Swimming', icon: 'pi pi-swimmer'},
  {name: 'Running', value: 'Running', icon: 'pi pi-running'}
];

function handleUpdateName(value: string) {
  console.log('handleUpdate', value)
  emits('update:generalInformation', {...props.generalInformation, name: value})
  isVeeFieldValid.value = !!value.length
}

function handleActivitiesUpdate(updatedActivities: Object[]) {
  // Log the changes
  console.log('Activities updated:', updatedActivities);

  // Emit the event with the updated information
  emits('update:generalInformation', {...props.generalInformation, activities: updatedActivities});

}
</script>

<template>
  <Divider
    align="center"
    type="Solid"
  >
    <b>General Information</b>
  </Divider>
  <div class="container">
    <div class="row">
      <div class="field-container">
        <label
          for="name"
          class="label"
        >Name:</label>
        <VeeField
          id="name"
          as="InputText"
          name="workout-name"
          label="name"
          :model-value="generalInformation.name"
          placeholder="Name"
          rules="required"
          :invalid="!isVeeFieldValid"
          @update:model-value="handleUpdateName"
        />
        <div class="error-message">
          <VeeErrorMessage
            name="workout-name"
          />
        </div>
      </div>
      <div class="field-container">
        <label
          for="date"
          class="label"
        >Date:</label>
        <Calendar
          id="date"
          :model-value="generalInformation.date"
          date-format="dd/mm/yy"
          placeholder="Date"
          :show-icon="true"
          @update:model-value="$emit('update:generalInformation', {...generalInformation, date: $event})"
        />
      </div>
    </div>
    <div class="field-container">
      <label
        for="activities"
        class="label"
      >Activities:</label>
      <MultiSelect
        id="activities"
        :model-value="generalInformation.activities"
        :options="activityOptions"
        option-label="name"
        placeholder="Select Activities"
        display="chip"
        @update:model-value="handleActivitiesUpdate($event)"
      />
    </div>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  gap: 20px; /* Adjusts space between elements */
}

.row {
  display: flex;
  gap: 20px; /* Adjusts space between the "Name" and "Date" fields */
  justify-content: flex-start; /* Align the items to the start */
  align-items: flex-start; /* Align items at the top */
  flex-wrap: wrap; /* Allows items to wrap if not enough space */
}

.field-container {
  display: flex;
  flex-direction: column; /* Stack label and input vertically */
  align-items: flex-start; /* Align items to the start of the container */
}

.label {
  margin-bottom: 5px; /* Space between label and input */
  text-align: left; /* Ensure label text is aligned to the left */
}

.error-message {
  color: #f87171;
}
</style>


