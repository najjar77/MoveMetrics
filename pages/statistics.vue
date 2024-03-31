<script setup lang="ts">
import Fieldset from "primevue/fieldset";
import Card from "primevue/card";
import PieChart from "~/components/StatisticCharts/DoughnutChart.vue";
import BarChart from "~/components/StatisticCharts/BarChart.vue";
import BarChartRunning from "~/components/StatisticCharts/LineChartRunning.vue";
import LineChartCycling from "~/components/StatisticCharts/LineChartCycling.vue";
import StackedBarSupplements from "~/components/StatisticCharts/StackedBarSupplements.vue";
</script>

<template>
  <div>
    <Fieldset legend="Statistics">
      <p class="title-bold">
        Here is a summary of your sports entries in numbers/graphics.
      </p>

      <div class="cards-container">
        <!--Total Sport-->
        <Card>
          <template #title> Sports summary </template>
          <template #content>
            <PieChart />
          </template>
        </Card>
        <!--Total Sport-->
        <Card>
          <template #title> Total number of Sport </template>
          <template #content>
            <BarChart />
          </template>
        </Card>
        <!--Running Overview-->
        <Card>
          <template #title> Running overview </template>
          <template #content>
            <BarChartRunning />
          </template>
        </Card>
        <!--Cycling Overview-->
        <Card>
          <template #title> Cycling Overview </template>
          <template #content>
            <LineChartCycling />
          </template>
        </Card>
        <!--Supplements Intake -->
        <Card>
          <template #title> Supplements Intake </template>
          <template #content>
            <StackedBarSupplements />
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

.wide-card {
  flex: 0 0 400px; /* Setzt die Basisgröße auf 400px, aber erlaubt nicht das Schrumpfen oder Wachsen */
}

.title-bold {
  font-weight: bold;
}
</style>
