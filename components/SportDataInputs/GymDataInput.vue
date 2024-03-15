<script setup lang="ts">
import Checkbox from "primevue/checkbox";

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
        input-id="back"
        name="back"
        :binary="true"
      />
      <label
        for="back"
        class="label-margin"
      >Back</label>
    </div>
    <div class="flex align-items-center">
      <Checkbox
        input-id="biceps"
        name="biceps"
        :binary="true"
      />
      <label
        for="biceps"
        class="label-margin"
      >Biceps</label>
    </div>
    <div class="flex align-items-center">
      <Checkbox
        input-id="chest"
        name="chest"
        :binary="true"
      />
      <label
        for="chest"
        class="label-margin"
      >Chest</label>
    </div>
    <div class="flex align-items-center">
      <Checkbox
        input-id="legs"
        name="legs"
        :binary="true"
      />
      <label
        for="legs"
        class="label-margin"
      >Legs</label>
    </div>
    <div class="flex align-items-center">
      <Checkbox
        input-id="triceps"
        name="triceps"
        :binary="true"
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