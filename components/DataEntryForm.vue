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

const formData = reactive<WorkoutData>({generalInformation: {name: (''), date: new Date(), activities: []}});

function MyTestFunction(event: string) {
  console.log('i got event', event);
  console.log(formData.generalInformation?.name)
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
        <GeneralDataInputs v-model:generalInformation="formData.generalInformation"
                           @update:generalInformation="MyTestFunction"/>
        <!-- Cycling Information -->
        <CyclingDataInputs/>
        <!-- Supplements Intake Information -->
        <SupplementsIntakeInputs/>
        <!-- Sauna Information -->
        <SaunaDataInputs/>
        <!-- Feedback Information -->
        <FeedbackDataInputs/>
        <Divider/>

        <!-- Save / Cancel / Reset Interaction -->
        <Toolbar>
          <template #start>
            <Button label="Cancel / Close" severity="secondary" icon="pi pi-times"/>

          </template>
          <template #center>
            <Button lable="Reset" v-tooltip.top="'Reset Form'" severity="secondary" icon="pi pi-refresh"/>
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