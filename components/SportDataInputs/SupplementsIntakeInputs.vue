<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import InputNumber from 'primevue/inputnumber';
import type {SuppIntakeInfo} from "~/models/formData/suppIntakeInfo";


const prop = defineProps<{
  suppIntakeInfo: SuppIntakeInfo
}>();


</script>

<template>
  <Divider align="center" type="solid">
    <b>Supplements Intake</b>
  </Divider>
  <div class="container">
    <div class="field-container">
      <label for="bcaa" class="label">BCAA:</label>
      <div class="input-container">
        <Checkbox :modelValue="suppIntakeInfo.bcaa"
                  @update:modelValue="$emit('update:suppIntakeInfo', {...suppIntakeInfo, bcaa: $event})"
                  inputId="bcaa" name="bcaa" :binary="true"/>
        <InputNumber :modelValue="suppIntakeInfo.bcaaAmount"
                     @update:modelValue="$emit('update:suppIntakeInfo', {...suppIntakeInfo, bcaaAmount: $event})"
                     placeholder="Amount in gr" locale="de-DE" :minFractionDigits="2"/>
      </div>
    </div>
    <div class="field-container">
      <label for="creatin" class="label">Creatin:</label>
      <div class="input-container">
        <Checkbox :modelValue="suppIntakeInfo.creatin"
                  @update:modelValue="$emit('update:suppIntakeInfo', {...suppIntakeInfo, creatin: $event})"
                  inputId="creatin" name="creatin" :binary="true"/>
        <InputNumber :modelValue="suppIntakeInfo.creatinAmount"
                     @update:modelValue="$emit('update:suppIntakeInfo', {...suppIntakeInfo, creatinAmount: $event})"
                     placeholder="Amount in gr" locale="de-DE" :minFractionDigits="2"/>
      </div>
    </div>
    <div class="field-container">
      <label for="eaa" class="label">EAA:</label>
      <div class="input-container">
        <Checkbox :modelValue="suppIntakeInfo.eaa"
                  @update:modelValue="$emit('update:suppIntakeInfo', {...suppIntakeInfo, eaa: $event})"
                  inputId="eaa" name="eaa" :binary="true"/>
        <InputNumber :modelValue="suppIntakeInfo.eaaAmount"
                     @update:modelValue="$emit('update:suppIntakeInfo', {...suppIntakeInfo, eaaAmount: $event})"
                     placeholder="Amount in gr" locale="de-DE" :minFractionDigits="2"/>
      </div>
    </div>
    <div class="field-container">
      <label for="protein" class="label">Protein:</label>
      <div class="input-container">
        <Checkbox :modelValue="suppIntakeInfo.protein"
                  @update:modelValue="$emit('update:suppIntakeInfo', {...suppIntakeInfo, protein: $event})"
                  inputId="protein" name="protein" :binary="true"/>
        <InputNumber :modelValue="suppIntakeInfo.proteinAmount"
                     @update:modelValue="$emit('update:suppIntakeInfo', {...suppIntakeInfo, proteinAmount: $event})"
                     placeholder="Amount in gr" locale="de-DE" :minFractionDigits="2"/>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Styles for the container wrapping all form elements. */
.container {
  display: flex; /* Use flexbox layout to arrange child elements. */
  flex-wrap: wrap; /* Allow child elements to wrap to the next line if there's not enough space. */
  gap: 20px; /* Set the space between child elements. */
  justify-content: flex-start; /* Align child elements to the start of the container (left alignment). */
  align-items: flex-start; /* Vertically align child elements to the start of the container (top alignment). */
}

/* Styles for each individual field container, which wraps a label and its corresponding input(s). */
.field-container {
  display: flex; /* Use flexbox layout to arrange child elements. */
  flex-direction: column; /* Stack child elements vertically. */
  align-items: flex-start; /* Align child elements to the start of the container (left alignment). */
  gap: 5px; /* Set the space between stacked elements (between label and input). */
}

/* Styles for the input container, which wraps a checkbox and an input number side by side. */
.input-container {
  display: flex; /* Use flexbox layout to arrange child elements. */
  flex-direction: row; /* Place child elements side by side horizontally. */
  align-items: center; /* Vertically align child elements to the center of the container. */
  gap: 10px; /* Set the space between the checkbox and the input number. */
}

/* Styles for labels associated with each input. */
.label {
  text-align: left; /* Align text within the label to the left. */
}
</style>

