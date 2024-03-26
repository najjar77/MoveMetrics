<script setup lang="ts">
import {ref, watch} from 'vue';
import Chart from 'chart.js/auto';
import {useAuth} from '~/composables/useAuth';
import {fetchWorkoutDataByUser} from "~/firebase/DBController";

const chartCanvas = ref<HTMLCanvasElement | null>(null);
const {user} = useAuth();
type ActivityCounts = Record<string, number>;

let myChart: Chart<"bar", number[], string> | null = null;
const isLoading = ref(true);
const createChart = async (userId: string) => {
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
    if (myChart) {
      myChart.destroy();
    }
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels, // Die Namen der Sportarten
        datasets: [{
          label: 'Total number of activities',
          data: dataPoints, // Die Häufigkeit jeder Aktivität
          backgroundColor: [
            'rgba(178,18,51,0.6)',
            'rgba(8,102,167,0.6)',
            'rgba(206,151,18,0.6)',
            'rgb(204,85,14)',
            'rgba(39,181,8,0.6)',
          ],
          borderColor: [
            'rgba(178,18,51,1)',
            'rgba(8,102,167,1)',
            'rgba(206,151,18,1)',
            'rgb(204,85,14,1)',
            'rgba(39,181,8,1)',
          ],
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  isLoading.value = false;
};

// Beobachtet Änderungen an der Benutzeranmeldung und lädt das Diagramm neu, wenn ein Benutzer angemeldet ist
watch(() => user.value?.uid, (newVal, oldVal) => {
  if (newVal) {
    createChart(newVal);
  }
}, {immediate: true}); // `immediate: true` sorgt dafür, dass der Watcher beim initialen Setup ausgeführt wird

const initChart = () => {
  if (user.value?.uid) {
    createChart(user.value.uid);
  }
};

onMounted(() => {
  initChart(); // Versuche, das Chart beim Mounten zu initialisieren
});

watch(() => user.value?.uid, (newVal) => {
  initChart(); // Initialisiere das Chart neu, wenn die Benutzer-ID sich ändert
}, {immediate: true});

onBeforeUnmount(() => {
  if (myChart) {
    myChart.destroy(); // Sichere Zerstörung des Charts, wenn die Komponente demontiert wird
  }
});
</script>


<template>
  <div>
    <div v-if="isLoading">
      Loading...
    </div> <!-- Add this line -->

    <canvas ref="chartCanvas" />
  </div>
</template>

<style scoped>

</style>