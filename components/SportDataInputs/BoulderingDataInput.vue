<script setup lang="ts">
import type { BoulderingInformation } from "~/models/formData/boulderingInformation";
import InputSwitch from "primevue/inputswitch";

defineProps<{
  boulderingInformation?: BoulderingInformation;
}>();

defineEmits<{
  (
    e: "update:boulderingInformation",
    boulderingInfo: BoulderingInformation,
  ): void;
}>();
</script>

<template>
  <Divider align="center" type="solid">
    <b>Bouldering</b>
  </Divider>

  <div class="container">
    <div class="field-container">
      <label for="BoulderingTime" class="label">Time:</label>
      <Calendar
        id="BoulderingTime"
        :model-value="boulderingInformation?.time"
        time-only
        @update:model-value="
          $emit('update:boulderingInformation', {
            ...boulderingInformation,
            time: $event,
          })
        "
      />
    </div>
    <div class="field-container-of-switch">
      <label for="BoulderingWhere" class="label">Outside / Inside</label>
      <InputSwitch
        id="BoulderingWhere"
        :model-value="boulderingInformation?.inside"
        @update:model-value="
          $emit('update:boulderingInformation', {
            ...boulderingInformation,
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
