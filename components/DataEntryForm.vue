<script setup lang="ts">
import Divider from "primevue/divider";
import GeneralDataInputs from "~/components/SportDataInputs/GeneralDataInputs.vue";
import CyclingDataInputs from "~/components/SportDataInputs/CyclingDataInputs.vue";
import SupplementsIntakeInputs from "~/components/SportDataInputs/SupplementsIntakeInputs.vue";
import SaunaDataInputs from "~/components/SportDataInputs/SaunaDataInputs.vue";
import FeedbackDataInputs from "~/components/SportDataInputs/FeedbackDataInputs.vue";
import type { WorkoutData } from "~/models/formData/workoutData";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import GymDataInput from "~/components/SportDataInputs/GymDataInput.vue";
import RunningDataInput from "~/components/SportDataInputs/RunningDataInput.vue";
import SwimmingDataInput from "~/components/SportDataInputs/SwimmingDataInput.vue";
import BoulderingDataInput from "~/components/SportDataInputs/BoulderingDataInput.vue";
import { defineRule } from "vee-validate";

const props = defineProps({
  visible: Boolean,
  isEditMode: {
    type: Boolean,
    default: true,
  },
  prefilledWorkoutData: Object,
});
const { validate } = useForm();

const isEditMode = ref(props.isEditMode);
const newFromText = "Here you can add a new workout entry to your dataset.";
const editFormText = "Here you can Edit your Workout entry.";

const emit = defineEmits([
  "update:visible",
  "dataSaved",
  "showSuccess",
  "showError",
  "submitData",
  "submitUpdatedData",
]);

const defaultWorkoutData = {
  generalInformation: { name: "", date: new Date(), activities: [] },
  cyclingInformation: { distanceInKm: 0, time: "00:00", inside: true },
  suppIntakeInfo: {
    bcaa: false,
    creatin: true,
    eaa: true,
    protein: true,
    bcaaAmount: 0,
    creatinAmount: 7,
    eaaAmount: 9,
    proteinAmount: 100,
  },
  saunaInformation: { finnish: false, steam: false, bio: false },
  feedbackInformation: { sliderFeedback: 50, textFeedback: "" },
  gymInformation: {
    back: false,
    biceps: false,
    chest: false,
    legs: false,
    triceps: false,
  },
  runningInformation: { distanceInKm: 0, time: "00:00" },
  swimmingInformation: { distanceInM: 0, time: "00:00" },
  boulderingInformation: { inside: false, time: "00:00" },
};

const workoutData = reactive<WorkoutData>(
  props.prefilledWorkoutData ?? defaultWorkoutData,
);
//TODO: does not work here
const recomputeTrigger = ref(false);

const visibilityOfGym = computed(() => {
  recomputeTrigger.value;
  return workoutDataIncludesSport("Gym");
});
const visibilityOfCycling = computed(() => {
  recomputeTrigger.value;
  return workoutDataIncludesSport("Cycling");
});
const visibilityOfSwimming = computed(() => {
  recomputeTrigger.value;
  return workoutDataIncludesSport("Swimming");
});
const visibilityOfRunning = computed(() => {
  recomputeTrigger.value;
  return workoutDataIncludesSport("Running");
});
const visibilityOfBouldering = computed(() => {
  recomputeTrigger.value;
  return workoutDataIncludesSport("Bouldering");
});

function workoutDataIncludesSport(sportName: string): boolean {
  return (
    workoutData.generalInformation?.activities?.some(
      (activity: { value: string }) => activity.value === sportName,
    ) ?? false
  );
}

function closeDialog() {
  console.log("close Dialog");
  emit("update:visible", false);
  resetWorkoutData();
  recomputeTrigger.value = !recomputeTrigger.value;
}

// Reset function to reset workoutData to its default state
function resetWorkoutData() {
  workoutData.generalInformation = { ...defaultWorkoutData.generalInformation };
  workoutData.cyclingInformation = defaultWorkoutData.cyclingInformation;
  workoutData.suppIntakeInfo = defaultWorkoutData.suppIntakeInfo;
  workoutData.saunaInformation = defaultWorkoutData.saunaInformation;
  workoutData.feedbackInformation = defaultWorkoutData.feedbackInformation;
  workoutData.runningInformation = defaultWorkoutData.runningInformation;
  workoutData.gymInformation = defaultWorkoutData.gymInformation;
  workoutData.swimmingInformation = defaultWorkoutData.swimmingInformation;
  workoutData.boulderingInformation = defaultWorkoutData.boulderingInformation;
}

async function submitUpdatedData() {
  emit("submitUpdatedData", workoutData.id, workoutData);
}

async function submitData() {
  if ((await validate()).valid) {
    emit("submitData", workoutData);
  } else {
    console.log("verpiss dich junge");
  }
}

onBeforeMount(() => {
  defineRule("required", (value: any, _, ctx) => {
    if (!value || !value.length) {
      return ctx.field + " is required";
    }
    return true;
  });
});

//TODO: Add more space between all Activity sections
</script>

<template>
  <Toast />
  <div class="center-container-parent">
    <Dialog
      :visible="visible"
      modal
      style="width: 60rem"
      :header="!isEditMode ? 'Add New Workout Entry' : 'Edit Workout Entry'"
      @update:visible="$emit('update:visible', $event)"
      @hide="resetWorkoutData"
    >
      <div class="intro-text">
        <i class="pi pi-plus" style="margin-right: 0.5rem" />
        {{ !isEditMode ? newFromText : editFormText }}
      </div>

      <!-- General Information -->
      <GeneralDataInputs
        v-model:generalInformation="workoutData.generalInformation"
      />
      <!-- Bouldering Information -->
      <BoulderingDataInput
        v-if="visibilityOfBouldering"
        v-model:boulderingInformation="workoutData.boulderingInformation"
      />
      <!-- Cycling Information -->
      <CyclingDataInputs
        v-if="visibilityOfCycling"
        v-model:cyclingInformation="workoutData.cyclingInformation"
      />
      <!-- Gym Information -->
      <GymDataInput
        v-if="visibilityOfGym"
        v-model:gymInformation="workoutData.gymInformation"
      />
      <!-- Swimming Information -->
      <SwimmingDataInput
        v-if="visibilityOfSwimming"
        v-model:swimmingInformation="workoutData.swimmingInformation"
      />
      <!-- Running Information -->
      <RunningDataInput
        v-if="visibilityOfRunning"
        v-model:runningInformation="workoutData.runningInformation"
      />
      <!-- Supplements Intake Information -->
      <SupplementsIntakeInputs
        v-model:suppIntakeInfo="workoutData.suppIntakeInfo"
      />
      <!-- Sauna Information -->
      <SaunaDataInputs
        v-model:saunaInformation="workoutData.saunaInformation"
      />
      <!-- Feedback Information -->
      <FeedbackDataInputs
        v-model:feedbackInformation="workoutData.feedbackInformation"
      />
      <Divider />

      <template #footer>
        <Button
          v-tooltip.top="'Reset Form'"
          lable="Reset"
          severity="secondary"
          icon="pi pi-refresh"
          @click="resetWorkoutData"
        />
        <Button
          v-tooltip.top="'Close Dialog'"
          label="Cancel"
          severity="secondary"
          icon="pi pi-times"
          @click="closeDialog"
        />
        <Button
          v-if="!isEditMode"
          label="Save"
          icon="pi pi-plus"
          @click="submitData"
        />
        <Button
          v-else
          label="Update"
          icon="pi pi-check"
          @click="submitUpdatedData"
        />
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
  margin-bottom: 2rem;
  /* Adjust the space as needed */
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
