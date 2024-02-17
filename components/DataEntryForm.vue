<script setup lang="ts">
import Card from 'primevue/card';
import Divider from "primevue/divider";
import GeneralDataInputs from "~/components/SportDataInputs/GeneralDataInputs.vue";
import Toolbar from 'primevue/toolbar';
import CyclingDataInputs from "~/components/SportDataInputs/CyclingDataInputs.vue";
import SupplementsIntakeInputs from "~/components/SportDataInputs/SupplementsIntakeInputs.vue";
import SaunaDataInputs from "~/components/SportDataInputs/SaunaDataInputs.vue";
import FeedbackDataInputs from "~/components/SportDataInputs/FeedbackDataInputs.vue";
import type {WorkoutData} from "~/models/formData/workoutData";

//TODO: time should have another Date format!
const getDefaultWorkoutData = (): WorkoutData => ({
  generalInformation: {name: (''), date: new Date(), activities: []},
  cyclingInformation: {distanceInKm: (0), time: "00:00", inside: true},
  suppIntakeInfo: {
    bcaa: false,
    creatin: true,
    eaa: true,
    protein: true,
    bcaaAmount: (0),
    creatinAmount: (7),
    eaaAmount: (9),
    proteinAmount: (100)
  },
  saunaInformation: {finnish: false, steam: false, bio: false},
  feedbackInformation: {sliderFeedback: (50), textFeedback: ('')}
});

const workoutData = reactive(getDefaultWorkoutData());


// Reset function to reset workoutData to its default state
function resetWorkoutData() {
  Object.assign(workoutData, getDefaultWorkoutData());
}

// Test Function for the data Inputs
function MyTestFunction(event: string) {
  console.log('i got event', event);
  //console.log(workoutData.generalInformation?.name);
  //console.log(workoutData.cyclingInformation?.distanceInKm);
  console.log(workoutData.suppIntakeInfo?.protein);
  console.log(workoutData.suppIntakeInfo?.proteinAmount);

}

</script>

<template>
  <div class="center-container-parent">
    <Card style="width: 60rem">
      <template #title>
        <div class="title-container">
          <i class="pi pi-plus" style="margin-right: 0.5rem;"></i>
          Add Workout Entry
        </div>
      </template>
      <template #content>

        <!-- General Information -->
        <GeneralDataInputs v-model:generalInformation="workoutData.generalInformation"
                           @update:generalInformation="MyTestFunction"/>
        <!-- Cycling Information -->
        <CyclingDataInputs v-model:cyclingInformation="workoutData.cyclingInformation"
                           @update:cyclingInformation="MyTestFunction"/>
        <!-- Supplements Intake Information -->
        <SupplementsIntakeInputs v-model:suppIntakeInfo="workoutData.suppIntakeInfo"
                                 @update:suppIntakeInfo="MyTestFunction"/>
        <!-- Sauna Information -->
        <SaunaDataInputs v-model:saunaInformation="workoutData.saunaInformation"
                         @update:saunaInformation="MyTestFunction"/>
        <!-- Feedback Information -->
        <FeedbackDataInputs v-model:feedbackInformation="workoutData.feedbackInformation"
                            @update:feedbackInformation="MyTestFunction"/>
        <Divider/>

        <!-- Save / Cancel / Reset Interaction -->
        <Toolbar>
          <template #start>
            <Button label="Cancel / Close" severity="secondary" icon="pi pi-times"/>

          </template>
          <template #center>
            <Button lable="Reset" @click="resetWorkoutData" v-tooltip.top="'Reset Form'" severity="secondary"
                    icon="pi pi-refresh"/>
          </template>
          <template #end>
            <Button label="Save" icon="pi pi-plus"/>
          </template>
        </Toolbar>
      </template>
    </Card>
  </div>


</template>


<style scoped>
.center-container-parent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.title-container {
  text-align: center;
}


</style>