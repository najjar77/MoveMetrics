<script setup lang="ts">

import type {RunningInformation} from "~/models/formData/runningInformation";
import InputNumber from "primevue/inputnumber";

const prop = defineProps<{
  runningInformation: RunningInformation
}>()
const distanceInKm = ref(0);
const time = ref("");
</script>

<template>
  <Divider
    align="center"
    type="Solid"
  >
    <b>Running</b>
  </Divider>
  <div class="container">
    <div class="field-container">
      <label
        for="RunningDistance"
        class="label"
      >Distance in KM:</label>
      <InputNumber
        :model-value="runningInformation.distanceInKm"
        input-id="RunningDistance"
        locale="de-DE"
        :min-fraction-digits="2"
        @update:model-value="$emit('update:runningInformation' , { ...runningInformation, distanceInKm: $event })"
      />
    </div>
    <div class="field-container">
      <label
        for="RunningTime"
        class="label"
      >Time:</label>
      <Calendar
        id="RunningTime"
        :model-value="runningInformation.time"
        time-only
        @update:model-value="$emit('update:runningInformation', { ...runningInformation, time: $event })"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  /* Allows items to wrap if not enough space */
  gap: 20px;
  /* Adjusts space between elements */
  justify-content: flex-start;
  /* Align the items to the left */
  align-items: flex-start;
  /* Align items to the start vertically */
}

.field-container {
  display: flex;
  flex-direction: column;
  /* Stack label and input vertically */
  align-items: flex-start;
  /* Keep items aligned to the start of the container */
}

.label {
  margin-bottom: 5px;
  /* Space between label and input */
  text-align: left;
  /* Ensure label text is aligned to the left */
}
</style>