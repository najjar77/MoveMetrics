<script setup lang="ts">
import {ref} from 'vue';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import Slider from 'primevue/slider';
import Fieldset from 'primevue/fieldset';
import Textarea from 'primevue/textarea';
import Divider from 'primevue/divider';
import MultiSelect from 'primevue/multiselect';
import Card from 'primevue/card';


const name = ref('');
const date = ref<Date | null>(null);
const selectedCheckboxes = ref([]);
const checkboxOptions = [
  {label: 'Option 1', value: '1'},
  {label: 'Option 2', value: '2'},
  {label: 'Option 3', value: '3'},
  {label: 'Option 4', value: '4'}
];
const selectedDropdown1 = ref(null);
const selectedDropdown2 = ref(null);
const dropdownOptions = [
  {label: 'Option 1', value: '1'},
  {label: 'Option 2', value: '2'},
  {label: 'Option 3', value: '3'},
  {label: 'Option 4', value: '4'}
];
const sliderValue = ref(50);
const textareaValue = ref('');
</script>

<template>

  <Card>
    <template #title>Add Sport Entry</template>
    <template #content>
      <div class="p-d-flex p-flex-column p-jc-center p-ai-center">
        <!-- Name and Date Section -->

        <Fieldset legend="Name & Date">
          <InputText v-model="name" placeholder="Enter your name"/>
          <Calendar v-model="date" placeholder="Select a date"/>
        </Fieldset>

        <!-- Checkboxes Section -->
        <Fieldset legend="Options">
          <div v-for="option in checkboxOptions" :key="option.value">
            <Checkbox v-model="selectedCheckboxes" :value="option.value"/>
            {{ option.label }}
          </div>
        </Fieldset>

        <!-- Dropdowns Section -->
        <Fieldset legend="Selections">
          <MultiSelect v-model="selectedDropdown1" :options="dropdownOptions" optionLabel="label"
                       placeholder="Select an option"/>
          <MultiSelect v-model="selectedDropdown2" :options="dropdownOptions" optionLabel="label"
                       placeholder="Select an option"/>
        </Fieldset>

        <!-- Slider and Textarea Section -->
        <Fieldset legend="Feedback">
          <InputText v-model.number="sliderValue"/>
          <Slider v-model="sliderValue" :min="0" :max="100"/>
          <Divider/>
          <Textarea v-model="textareaValue" rows="5" cols="30" placeholder="Enter your message"/>
        </Fieldset>
      </div>
    </template>
  </Card>


</template>


<style scoped>

</style>

