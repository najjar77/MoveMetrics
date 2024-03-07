<script setup lang="ts">
import Divider from "primevue/divider";
import GeneralDataInputs from "~/components/SportDataInputs/GeneralDataInputs.vue";
import CyclingDataInputs from "~/components/SportDataInputs/CyclingDataInputs.vue";
import SupplementsIntakeInputs from "~/components/SportDataInputs/SupplementsIntakeInputs.vue";
import SaunaDataInputs from "~/components/SportDataInputs/SaunaDataInputs.vue";
import FeedbackDataInputs from "~/components/SportDataInputs/FeedbackDataInputs.vue";
import type {WorkoutData} from "~/models/formData/workoutData";
import {saveWorkoutData, updateWorkoutData} from "~/firebase/DBController";
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';

const props = defineProps({
      visible: Boolean,
      isEditMode: {
        type: Boolean,
        default: true
      },
      prefilledWorkoutData: Object
    }
);

const emit = defineEmits(['update:visible', 'dataSaved', 'showSuccess', 'showError']);
const isEditMode = ref(props.isEditMode);


const newFromText = 'Here you can add a new workout entry to your dataset.';
const editFormText = "Here you can Edit your Workout entry.";

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

const workoutData = reactive(props.prefilledWorkoutData ?? getDefaultWorkoutData());


const showSuccess = () => {
  emit('showSuccess');
};
const showError = () => {
  emit('showError')
};


// Modify the closeDialog function to update the local reactive state
function closeDialog() {
  emit('update:visible', false);
  resetWorkoutData();

}


// Reset function to reset workoutData to its default state
function resetWorkoutData() {
  Object.assign(workoutData, getDefaultWorkoutData());
}


// Test Function for the data Inputs
function MyTestFunction(event: string) {
  //console.log('i got event', event);
  //console.log(workoutData.generalInformation?.name);
  //console.log(workoutData.cyclingInformation?.distanceInKm);
  //console.log(workoutData.suppIntakeInfo?.protein);
  //console.log(workoutData.suppIntakeInfo?.proteinAmount);
}

const submitUpdateData = async () => {
  try {
    await updateWorkoutData(workoutData.id, workoutData);
    console.log("Data updated successfully with ID: ", workoutData.id);
    showSuccess();
    closeDialog();
    emit('dataSaved', workoutData);

  } catch (error) {
    console.error("Failed to update entry set: ", error)
  }
}

const submitData = async () => {
  try {
    const docId = await saveWorkoutData(workoutData);
    console.log("Data saved with ID: ", docId);
    showSuccess();
    closeDialog();
    emit('dataSaved', workoutData);
  } catch (error) {
    console.error("Failed to save data: ", error);
    showError();
    // Handle errors, e.g., showing an error message
  }
};


</script>

<template>
  <Toast/>
  <div class="center-container-parent">
    <Dialog :visible="visible" @update:visible="$emit('update:visible', $event)" modal style="width: 60rem"
            @hide="resetWorkoutData"
            :header="!isEditMode ?  'Add New Workout Entry':'Edit Workout Entry'">
      <div class="intro-text">
        <i class="pi pi-plus" style="margin-right: 0.5rem;"/>
        {{ !isEditMode ? newFromText : editFormText }}
      </div>


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

      <template #footer>
        <Button lable="Reset" @click="resetWorkoutData" v-tooltip.top="'Reset Form'" severity="secondary"
                icon="pi pi-refresh"/>
        <Button label="Cancel" @click="closeDialog" severity="secondary" v-tooltip.top="'Close Dialog'"
                icon="pi pi-times"/>
        <Button v-if="!isEditMode" label="Save" @click="submitData" icon="pi pi-plus"/>
        <Button v-else label="Update" @click="submitUpdateData" icon="pi pi-check"/>
      </template>

      <!-- Save / Cancel / Reset Interaction -->

    </Dialog>
  </div>


</template>


<style scoped>
.center-container-parent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.intro-text {
  margin-bottom: 2rem; /* Adjust the space as needed */
}

.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}


</style>