<script setup lang="ts">
import Fieldset from 'primevue/fieldset';
import Card from 'primevue/card';
import PieChart from "~/components/StatisticCharts/PieChart.vue";
import BarChart from "~/components/StatisticCharts/BarChart.vue";
</script>

<template>
  <div>
    <Fieldset legend="Statistics">
      <p class="m-0">
        Here is a summary of your sports entries in numbers
      </p>

      <div class="cards-container">
        <!--Total Sport-->
        <Card>
          <template #title>
            Total Sport
          </template>
          <template #content>
            <PieChart />
          </template>
        </Card>
        <!--Total Sport-->
        <Card>
          <template #title>
            Total Sport
          </template>
          <template #content>
            <BarChart />
          </template>
        </Card>
        <!--Total Sport-->
        <Card>
          <template #title>
            Total Sport
          </template>
          <template #content>
            <p class="m-0">
              here comes a pie chart for all kind off sports next to a agenda
            </p>
          </template>
        </Card>
        <!--Total Sport-->
        <Card>
          <template #title>
            Total Sport
          </template>
          <template #content>
            <p class="m-0">
              here comes a pie chart for all kind off sports next to a agenda
            </p>
          </template>
        </Card>
      </div>
    </Fieldset>
  </div>
</template>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Adjust the gap as needed */
}

/* Ensure cards are responsive and flex according to content size */
.cards-container > * {
  flex: 1;
  min-width: 300px; /* Adjust minimum width as needed */
  max-width: 100%; /* This ensures cards won't grow beyond the container's width */
}
</style>