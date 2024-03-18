<template>
  <div>
    <canvas ref="pieChartCanvas" />
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import Chart from 'chart.js/auto';

const pieChartCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (pieChartCanvas.value) {
    const ctx = pieChartCanvas.value.getContext('2d');
    if (ctx) {
      const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Red', 'Blue', 'Yellow'],
          datasets: [{
            label: 'Favorite Colors',
            data: [300, 50, 100],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'My Favorite Colors'
            }
          }
        },
      });
    }
  }
});
</script>
