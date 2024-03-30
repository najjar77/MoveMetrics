<script setup lang="ts">
import {onMounted, ref} from 'vue';
import Chart from 'chart.js/auto';
import {useAuth} from '~/composables/useAuth';
import {fetchWorkoutDataByUser} from "~/firebase/DBController";
import type {WorkoutData} from "~/models/formData/workoutData";

const chartCanvas = ref<HTMLCanvasElement | null>(null);
const {user} = useAuth();

interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

function isTimestamp(value: any): value is Timestamp {
  return value && typeof value.seconds === 'number';
}


const processRunningData = (workoutData: WorkoutData[]): [number[], number[]] => {
  const monthlyKm = Array(12).fill(0);
  const monthlyTimeMinutes = Array(12).fill(0);

  workoutData.forEach(workout => {
    const runningInfo = workout.runningInformation;
    if (runningInfo && isTimestamp(runningInfo.time)) {
      console.log("runningInfo.time: ", runningInfo.time.seconds);
      //@ts-ignore
      const month = new Date(workout.generalInformation.date).getMonth();
      console.log("month: ", month);
      monthlyKm[month] += runningInfo.distanceInKm;


      // Calculate the time in minutes and limit to one decimal place
      const timeMinutes = parseFloat((runningInfo.time.seconds / 60000000).toFixed(1));
      monthlyTimeMinutes[month] += timeMinutes;

    }
  });

  return [monthlyKm, monthlyTimeMinutes];
};

const createChart = (monthlyKm: number[], monthlyTime: number[]) => {
  if (!chartCanvas.value) return;
  const ctx = chartCanvas.value.getContext('2d');
  if (!ctx) return;

  const labels = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Kms run per month',
        data: monthlyKm,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(54, 162, 235)',
        fill: false,
      }, {
        label: 'running time per month (in minutes)',
        data: monthlyTime,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgb(255,99,132)',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(255,99,132)',
        fill: true,
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
    const [monthlyKm, monthlyTime] = processRunningData(workoutData);
    createChart(monthlyKm, monthlyTime);
  }
});

const loadDataAndCreateChart = async (userId: string) => {
  if (!userId) return;
  const workoutData = await fetchWorkoutDataByUser(userId);
  const [monthlyKm, monthlyTime] = processRunningData(workoutData);
  createChart(monthlyKm, monthlyTime);
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
