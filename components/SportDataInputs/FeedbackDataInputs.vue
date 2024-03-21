<script setup lang="ts">
import Slider from 'primevue/slider';
import Textarea from 'primevue/textarea';
import 'primeicons/primeicons.css';
import type {FeedbackInformation} from "~/models/formData/feedbackInformation";

const prop = defineProps<{
  feedbackInformation: FeedbackInformation
}>();

</script>

<template>
  <Divider
    align="center"
    type="solid"
  >
    <b>Feedback</b>
  </Divider>
  <div class="container">
    <div class="field-container">
      <label
        for="sliderFeedback"
        class="label"
      >
        How intense was the workout? <span class="bold-value"> {{ feedbackInformation.sliderFeedback }} %</span>
      </label>
    </div>
    <Slider
      id="sliderFeedback"
      :model-value="feedbackInformation.sliderFeedback"
      class="w-14rem"
      @update:model-value="$emit('update:feedbackInformation', {...feedbackInformation, sliderFeedback: $event})"
    />

    <div class="field-container">
      <label
        for="textFeedback"
        class="label"
      >Notes:</label>
      <Textarea
        id="textFeedback"
        :model-value="feedbackInformation.textFeedback"
        rows="5"
        cols="70"
        @update:model-value="$emit('update:feedbackInformation', {...feedbackInformation, textFeedback: $event})"
      />
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

