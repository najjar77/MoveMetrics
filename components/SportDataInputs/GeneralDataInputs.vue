<script setup lang="ts">
import {ref} from 'vue';
import Calendar from "primevue/calendar";
import InputText from "primevue/inputtext";
import 'primeicons/primeicons.css';
import MultiSelect from 'primevue/multiselect';
import type {GeneralInformation} from "~/models/formData/generalInformation";

const props = defineProps<{
  generalInformation: GeneralInformation
}>();

const name = ref('');
const date = ref(null);
const activities = ref([]); // To hold selected activities

// Define the options for the dropdown
const activityOptions = [
  {name: 'Cycling', value: 'Cycling', icon: 'pi pi-bicycle'},
  {name: 'Gym', value: 'Gym', icon: 'pi pi-dumbbell'},
  {name: 'Swimming', value: 'Swimming', icon: 'pi pi-swimmer'},
  {name: 'Running', value: 'Running', icon: 'pi pi-running'},
  {name: 'Bouldering', value: 'Bouldering', icon: 'pi pi-mountain'},
];

console.log(props.generalInformation)
</script>

<template>
  <Divider align="center" type="Solid">
    <b>General Information</b>
  </Divider>
  <div class="container">
    <div class="field-container">
      <label for="name" class="label">Name:</label>
      <InputText id="name" :modelValue="generalInformation.name"
                 @update:modelValue="$emit('update:generalInformation', {...generalInformation, name: $event})"
                 placeholder="Name"/>
    </div>
    <div class="field-container">
      <label for="date" class="label">Date:</label>
      <Calendar id="date" :modelValue="generalInformation.date"
                @update:modelValue="$emit('update:generalInformation', {...generalInformation, date: $event})"
                dateFormat="dd/mm/yy" placeholder="Date"
                :showIcon="true"/>
    </div>
    <div class="field-container">
      <label for="activities" class="label">Activities:</label>
      <MultiSelect id="activities" :modelValue="generalInformation.activities"
                   @update:modelValue="$emit('update:generalInformation', {...generalInformation, activities: $event})"
                   :options="activityOptions"
                   optionLabel="name"
                   placeholder="Select Activities" display="chip"/>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap; /* Allows items to wrap if not enough space */
  gap: 20px; /* Adjusts space between elements */
  justify-content: flex-start; /* Center the items horizontally */
  align-items: flex-start; /* Align the items vertically */
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
</style>

