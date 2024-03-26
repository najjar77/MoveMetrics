<script setup lang="ts">
import {onMounted, ref} from 'vue';
import Chart from 'chart.js/auto';
import {useAuth} from '~/composables/useAuth';
import {fetchWorkoutDataByUser} from "~/firebase/DBController";
import type {WorkoutData} from "~/models/formData/workoutData";

const chartCanvas = ref<HTMLCanvasElement | null>(null);
const {user} = useAuth();

// Annahme, dass WorkoutData ein Typ ist, der aus deinem Datenmodell importiert wurde
const processRunningData = (workoutData: WorkoutData[]): number[] => {
  const monthlyKm = Array(12).fill(0);

  workoutData.forEach(workout => {
    const runningInfo = workout.runningInformation;
    if (runningInfo) {
      //@ts-ignore
      const month = new Date(workout.generalInformation.date).getMonth();
      monthlyKm[month] += runningInfo.distanceInKm;
    }
  });

  return monthlyKm;
};

const createChart = (monthlyKm: number[]) => {
  if (!chartCanvas.value) return; // Überprüft, ob chartCanvas.value nicht null ist
  const ctx = chartCanvas.value.getContext('2d');
  if (!ctx) return; // Überprüft, ob ctx nicht null ist

  const labels = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Kms run per month',
        data: monthlyKm,
        backgroundColor: 'rgba(54,162,235,0.48)',
        borderColor: 'rgb(0,147,243)',
        borderWidth: 1
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
};

onMounted(async () => {
  if (user.value?.uid) {
    const workoutData = await fetchWorkoutDataByUser(user.value.uid) as WorkoutData[];
    const monthlyKm = processRunningData(workoutData);
    createChart(monthlyKm);
  }
});

const loadDataAndCreateChart = async (userId: string) => {
  if (!userId) return;
  const workoutData = await fetchWorkoutDataByUser(userId);
  const monthlyKm = processRunningData(workoutData);
  createChart(monthlyKm);
};

watch(() => user.value?.uid, (newUserId) => {
  if (newUserId && chartCanvas.value) {
    loadDataAndCreateChart(newUserId);
  }
}, {immediate: true});
</script>

<template>
  <div>
    <canvas ref="chartCanvas" />
  </div>
</template>

<style scoped>
</style>
