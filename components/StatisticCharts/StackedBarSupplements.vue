<script setup lang="ts">
import {onMounted, ref} from 'vue';
import Chart from 'chart.js/auto';
import {useAuth} from '~/composables/useAuth';
import {fetchWorkoutDataByUser} from "~/firebase/DBController";
import type {WorkoutData} from "~/models/formData/workoutData";

const chartCanvas = ref<HTMLCanvasElement | null>(null);
const {user} = useAuth();

//TODO: has some bugs must be fixed
const processSuppIntakeData = (workoutData: WorkoutData[]) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  // Initialisiere ein Array für jedes Supplement
  const supplementTotals: Record<string, number[]> = {
    "BCAA": Array(7).fill(0),
    "Creatin": Array(7).fill(0),
    "EAA": Array(7).fill(0),
    "Protein": Array(7).fill(0)
  };
  // Speichert das Datum für jeden Wochentag
  const datesOfWeek: string[] = Array(7).fill("");

  workoutData.forEach(workout => {
    const intakeInfo = workout.suppIntakeInfo;
    if (intakeInfo) {
      //@ts-ignore
      const date = new Date(workout.generalInformation.date);
      const dayIndex = date.getDay() - 1; // -1, da getDay() Sonntag als 0 behandelt
      if (dayIndex >= 0) { // -1 bedeutet Sonntag, hier nicht berücksichtigt
        datesOfWeek[dayIndex] = date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
        if (intakeInfo.bcaa) supplementTotals["BCAA"][dayIndex] += intakeInfo.bcaaAmount;
        if (intakeInfo.creatin) supplementTotals["Creatin"][dayIndex] += intakeInfo.creatinAmount;
        if (intakeInfo.eaa) supplementTotals["EAA"][dayIndex] += intakeInfo.eaaAmount;
        if (intakeInfo.protein) supplementTotals["Protein"][dayIndex] += intakeInfo.proteinAmount;
      }
    }
  });

  // Generiere Labels mit Wochentagen und Daten
  const labels = daysOfWeek.map((day, index) => `${day} (${datesOfWeek[index]})`);

  return {
    labels: labels,
    datasets: Object.keys(supplementTotals).map((supp, index) => ({
      label: supp,
      data: supplementTotals[supp],
      backgroundColor: [`rgba(255, 99, 132, 0.5)`, `rgba(54, 162, 235, 0.5)`, `rgba(255, 206, 86, 0.5)`, `rgba(75, 192, 192, 0.5)`][index % 4],
    }))
  };
};

// Funktion zum Erstellen des Charts
const createStackedBarChart = (data: { labels: string[], datasets: any[] }) => {
  const ctx = chartCanvas.value?.getContext('2d');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: 'Grams',
          }
        },
      },
    },
  });
};

// Chart initialisieren
onMounted(async () => {
  if (user.value?.uid) {
    const workoutData = await fetchWorkoutDataByUser(user.value.uid);
    const chartData = processSuppIntakeData(workoutData);
    createStackedBarChart(chartData);
  }
});
</script>

<template>
  <div>
    <canvas ref="chartCanvas" />
  </div>
</template>

<style scoped>
</style>
