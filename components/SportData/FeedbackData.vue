<script setup lang="ts">
import {ref} from 'vue';
import Slider from 'primevue/slider';
import Textarea from 'primevue/textarea';
import 'primeicons/primeicons.css'; // Stellen Sie sicher, dass Sie die PrimeIcons importieren, falls benötigt

const sliderFeedback = ref(50);
const textFeedback = ref('');
</script>

<template>
  <Divider align="center" type="solid">
    <b>Feedback</b>
  </Divider>
  <div class="container">
    <div class="field-container">
      <label for="sliderFeedback" class="label">
        How was the Workout? <span class="bold-value"> {{ sliderFeedback }} %</span>
      </label>
    </div>
    <Slider v-model="sliderFeedback" class="w-14rem" id="sliderFeedback"/>

    <div class="field-container">
      <label for="textFeedback" class="label">Notes:</label>
      <Textarea v-model="textFeedback" rows="5" cols="70" id="textFeedback"/>
    </div>
  </div>
</template>

<style scoped>
/* Bestehende Stile */
.container {
  display: flex;
  flex-direction: column; /* Elemente vertikal stapeln */
  gap: 20px; /* Platz zwischen den Elementen */
}

.field-container {
  display: flex;
  flex-direction: column; /* Label und Input vertikal stapeln */
  align-items: flex-start; /* Elemente am Anfang des Containers ausrichten */
}

.label {
  margin-bottom: 10px; /* Platz zwischen Label und Input */
  text-align: left; /* Label-Text linksbündig ausrichten */
}

/* Neuer Stil für den fettgedruckten Wert */
.bold-value {
  font-weight: bold; /* Macht den Text fett */
}
</style>

