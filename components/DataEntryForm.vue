<script setup lang="ts">
import {ref} from 'vue';

import Card from 'primevue/card';
import Divider from "primevue/divider";
import GeneralData from "~/components/SportData/GeneralData.vue";
import Toolbar from 'primevue/toolbar';
import CyclingData from "~/components/SportData/CyclingData.vue";
import Tooltip from 'primevue/tooltip';
import SupplementsIntake from "~/components/SportData/SupplementsIntake.vue";


</script>

<template>
  <div class="center-container-parent">
    <Card style="width: 55rem">
      <template #title>
        <div class="title-container">
          <i class="pi pi-plus" style="margin-right: 0.5rem;"></i>
          Add Workout Entry
        </div>
      </template>
      <template #content>
        <Divider/>
        <!-- General Information -->
        <GeneralData/>
        <!-- Cycling Information -->
        <CyclingData/>
        <!-- Supplements Intake Information -->
        <SupplementsIntake/>

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