<script setup lang="ts">
import Divider from "primevue/divider";
import GeneralDataInputs from "~/components/SportDataInputs/GeneralDataInputs.vue";
import CyclingDataInputs from "~/components/SportDataInputs/CyclingDataInputs.vue";
import SupplementsIntakeInputs from "~/components/SportDataInputs/SupplementsIntakeInputs.vue";
import SaunaDataInputs from "~/components/SportDataInputs/SaunaDataInputs.vue";
import FeedbackDataInputs from "~/components/SportDataInputs/FeedbackDataInputs.vue";
import type {WorkoutData} from "~/models/formData/workoutData";
import {saveWorkoutData} from "~/firebase/DBController";
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import {useToast} from 'primevue/usetoast';

const props = defineProps({
  visible: Boolean,
  isNewForm: Boolean,
  isEditForm: Boolean,
  newFormText: String,
  EditFormText: String
});

const emit = defineEmits(['update:visible', 'data-saved']);
const isVisible = ref(props.visible);


const newFromText = 'Here you can add a new workout entry to your dataset.';
const EditFormText = "Here you can Edit your Workout entry.";

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

const toast = useToast();

const showSuccess = () => {
  toast.add({severity: 'success', summary: 'Success Message', detail: 'Workout added successfully', life: 5000});
};
const showError = () => {
  toast.add({
    severity: 'error',
    summary: 'Missing Data',
    detail: 'Please fill out the mandatory fields',
    life: 5000
  });
};

watch(() => props.visible, (newVal) => {
  isVisible.value = newVal;
});

// Modify the closeDialog function to update the local reactive state
function closeDialog() {
  isVisible.value = false;
  emit('update:visible', false);
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

const submitData = async () => {
  try {
    const docId = await saveWorkoutData(workoutData);
    console.log("Data saved with ID:", docId);
    showSuccess();
    closeDialog();
    resetWorkoutData();
    emit('data-saved');
    // Handle post-save actions here, e.g., showing a success message or resetting the form
  } catch (error) {
    console.error("Failed to save data:", error);
    showError();
    // Handle errors, e.g., showing an error message
  }
};


</script>

<template>
  <Toast/>
  <div class="center-container-parent">
    <Dialog v-model:visible="isVisible" modal style="width: 60rem"
            header="Add New Workout Entry">
      <div class="intro-text">
        <i class="pi pi-plus" style="margin-right: 0.5rem;"/>
        Here you can add a new workout entry to your dataset
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
        <Button label="Cancel / Close" @click="closeDialog" severity="secondary" icon="pi pi-times"/>
        <Button label="Save" @click="submitData" icon="pi pi-plus"/>
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