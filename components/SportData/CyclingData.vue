<script setup lang="ts">
import {ref} from 'vue';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';

const distanceInKm = ref("");
const time=ref("");
const inside=ref(true);
const outside=!inside;

</script>

<template>
  <Divider align="center" type="solid">
    <b>Cycling</b>
  </Divider>
  <div class="container">
    <div class="field-container">
      <label for="distance" class="label">Distance in KM:</label>
      <InputNumber v-model="distanceInKm" inputId="distance" locale="de-DE" :minFractionDigits="2"/>
    </div>
    <div class="field-container">
      <label for="time" class="label">Time:</label>
      <Calendar id="calendar-timeonly" v-model="time" timeOnly />
    </div>
    <div class="field-container">
      <label for="where" class="label" >Outside / Inside</label>
      <InputSwitch v-model="inside" />
    </div>

  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-wrap: wrap; /* Allows items to wrap if not enough space */
  gap: 20px; /* Adjusts space between elements */
  justify-content: flex-start; /* Align the items to the left */
  align-items: flex-start; /* Align items to the start vertically */
}

.field-container {
  display: flex;
  flex-direction: column; /* Stack label and input vertically */
  align-items: flex-start; /* Keep items aligned to the start of the container */
}

.label {
  margin-bottom: 5px; /* Space between label and input */
  text-align: left; /* Ensure label text is aligned to the left */
}
</style>

