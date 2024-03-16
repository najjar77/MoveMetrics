<script setup lang="ts">
import {ref} from 'vue';
import Checkbox from "primevue/checkbox";
import type {GymInformation} from "~/models/formData/gymInformation";

const prop = defineProps<{
  gymInformation: GymInformation
}>()
const back = ref(false);
const biceps = ref(false);
const chest = ref(false);
const legs = ref(false);
const triceps = ref(false);

</script>

<template>
  <Divider
    align="center"
    type="Solid"
  >
    <b>GYM</b>
  </Divider>
  <div class="container">
    <div class="flex align-items-center">
      <Checkbox
        :model-value="gymInformation.back"
        input-id="back"
        name="back"
        :binary="true"
        @update:model-value="$emit('update:gymInformation',{...gymInformation,back:$event})"
      />
      <label
        for="back"
        class="label-margin"
      >Back</label>
    </div>
    <div class="flex align-items-center">
      <Checkbox
        :model-value="gymInformation.biceps"
        input-id="biceps"
        name="biceps"
        :binary="true"
        @update:model-value="$emit('update:gymInformation',{...gymInformation,biceps:$event})"
      />
      <label
        for="biceps"
        class="label-margin"
      >Biceps</label>
    </div>
    <div class="flex align-items-center">
      <Checkbox
        :model-value="gymInformation.chest"
        input-id="chest"
        name="chest"
        :binary="true"
        @update:model-value="$emit('update:gymInformation',{...gymInformation,chest:$event})"
      />
      <label
        for="chest"
        class="label-margin"
      >Chest</label>
    </div>
    <div class="flex align-items-center">
      <Checkbox
        :model-value="gymInformation.legs"
        input-id="legs"
        name="legs"
        :binary="true"
        @update:model-value="$emit('update:gymInformation',{...gymInformation,legs:$event})"
      />
      <label
        for="legs"
        class="label-margin"
      >Legs</label>
    </div>
    <div class="flex align-items-center">
      <Checkbox
        :model-value="gymInformation.triceps"
        input-id="triceps"
        name="triceps"
        :binary="true"
        @update:model-value="$emit('update:gymInformation',{...gymInformation,triceps:$event})"
      />
      <label
        for="triceps"
        class="label-margin"
      >Triceps</label>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap; /* Allows items to wrap if not enough space */
  gap: 80px; /* Adjusts space between elements */
  justify-content: flex-start; /* Align the items to the left */
  align-items: center; /* Align the items vertically in the center */
}

.label-margin {
  margin-left: 5px; /* Adjust the space as needed */
}
</style>