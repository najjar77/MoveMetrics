<script setup lang="ts">
import type { SwimmingInformation } from "~/models/formData/swimmingInformation";
import InputNumber from "primevue/inputnumber";

defineProps<{
  swimmingInformation?: SwimmingInformation;
}>();

defineEmits<{
  (e: "update:swimmingInformation", swimmingInfo: SwimmingInformation): void;
}>();
</script>

<template>
  <Divider align="center" type="solid">
    <b>Swimming</b>
  </Divider>
  <div class="container">
    <div class="field-container">
      <label for="distanceInM" class="label">Distance in KM:</label>
      <InputNumber
        :model-value="swimmingInformation?.distanceInM"
        input-id="distanceInM"
        locale="de-DE"
        :min-fraction-digits="2"
        @update:model-value="
          $emit('update:swimmingInformation', {
            ...swimmingInformation,
            distanceInM: $event,
          })
        "
      />
    </div>
    <div class="field-container">
      <label for="time" class="label">Time:</label>
      <Calendar
        id="calendar-timeonly"
        :model-value="swimmingInformation?.time"
        time-only
        @update:model-value="
          $emit('update:swimmingInformation', {
            ...swimmingInformation,
            time: $event,
          })
        "
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
