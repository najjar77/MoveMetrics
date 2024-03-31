<script setup lang="ts">
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import type { CyclingInformation } from "~/models/formData/cyclingInformation";

defineProps<{
  cyclingInformation?: CyclingInformation;
}>();

defineEmits<{
  (e: "update:cyclingInformation", cyclingInfo: CyclingInformation): void;
}>();
</script>

<template>
  <Divider align="center" type="solid">
    <b>Cycling</b>
  </Divider>
  <div class="container">
    <div class="field-container">
      <label for="CyclingDistance" class="label">Distance in KM:</label>
      <InputNumber
        :model-value="cyclingInformation?.distanceInKm"
        input-id="CyclingDistance"
        locale="de-DE"
        :min-fraction-digits="2"
        @update:model-value="
          $emit('update:cyclingInformation', {
            ...cyclingInformation,
            distanceInKm: $event,
          })
        "
      />
    </div>
    <div class="field-container">
      <label for="CyclingTime" class="label">Time:</label>
      <Calendar
        id="CyclingTime"
        :model-value="cyclingInformation?.time"
        time-only
        @update:model-value="
          $emit('update:cyclingInformation', {
            ...cyclingInformation,
            time: $event,
          })
        "
      />
    </div>
    <div class="field-container-of-switch">
      <label for="CyclingWhere" class="label">Outside / Inside</label>
      <InputSwitch
        id="CyclingWhere"
        :model-value="cyclingInformation?.inside"
        @update:model-value="
          $emit('update:cyclingInformation', {
            ...cyclingInformation,
            inside: $event,
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

.field-container-of-switch {
  display: flex;
  flex-direction: column;
  /* Stack label and input vertically */
  align-items: center;
  /* Keep items aligned to the start of the container */
}

.label {
  margin-bottom: 5px;
  /* Space between label and input */
  text-align: left;
  /* Ensure label text is aligned to the left */
}
</style>
