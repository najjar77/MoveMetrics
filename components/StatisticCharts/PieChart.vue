<script setup lang="ts">
import {ref, watch} from 'vue';
import Chart from 'chart.js/auto';
import {useAuth} from '~/composables/useAuth';
import {fetchWorkoutDataByUser} from "~/firebase/DBController";

const chartCanvas = ref<HTMLCanvasElement | null>(null);
const {user} = useAuth();
const isLoading = ref(true);

// Gleiche Struktur für die Aktivitätszählungen wie beim BarChart
type ActivityCounts = Record<string, number>;

let myPieChart: Chart<"pie", number[], string> | null = null;

const createPieChart = async (userId: string) => {
  isLoading.value = true;
  if (!chartCanvas.value) return;

  const workoutData = await fetchWorkoutDataByUser(userId);

  const activityCounts = workoutData.reduce((acc: ActivityCounts, workout) => {
    workout.generalInformation?.activities.forEach(activity => {
      acc[activity.value] = (acc[activity.value] || 0) + 1;
    });
    return acc;
  }, {} as ActivityCounts);

  const labels = Object.keys(activityCounts);
  const dataPoints = labels.map(label => activityCounts[label]);

  const ctx = chartCanvas.value.getContext('2d');
  if (ctx) {
    if (myPieChart) {
      myPieChart.destroy();
    }
    myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels, // Die Namen der Sportarten
        datasets: [{
          label: 'Total time of activities',
          data: dataPoints,
          backgroundColor: [
            'rgb(178,18,51)',
            'rgba(8,102,167,0.6)',
            'rgb(255,191,42)',
            'rgb(248,114,33)',
            'rgb(39,181,8)',
          ],
          borderColor: [
            'rgba(255,255,255,1)',
          ],
          borderWidth: 2
        }]
      }
    });
  }
  isLoading.value = false;
};

watch(() => user.value?.uid, (newVal) => {
  if (newVal) {
    createPieChart(newVal);
  }
}, {immediate: true});


const initChart = () => {
  if (user.value?.uid) {
    createPieChart(user.value.uid);
  }
};

onMounted(() => {
  initChart(); // Versuche, das Chart beim Mounten zu initialisieren
});

watch(() => user.value?.uid, (newVal) => {
  initChart(); // Initialisiere das Chart neu, wenn die Benutzer-ID sich ändert
}, {immediate: true});

</script>

<template>
  <div>
    <div v-if="isLoading">
      Loading...
    </div>
    <canvas ref="chartCanvas" />
  </div>
</template>

<style scoped>
</style>
