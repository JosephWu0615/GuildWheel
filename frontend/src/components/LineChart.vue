<template>
  <div style="position: relative; height: 300px;">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, watch, ref } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  TimeScale,
  Tooltip,
} from 'chart.js'
import 'chartjs-adapter-date-fns'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  TimeScale,
  Tooltip,
)

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const canvasRef = ref(null)
let chart = null

watch(() => props.data, (newData) => {
  if (!chart) return
  const labels = newData.map(d => new Date(d.timestamp))
  const values = newData.map(d => d.power_watts)

  chart.data.labels = labels
  chart.data.datasets[0].data = values
  chart.update('none') // 'none' makes update smooth
}, { deep: true })

onMounted(() => {
  const ctx = canvasRef.value.getContext('2d')

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Live Power (Watts)',
        data: [],
        borderColor: 'blue',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
      }]
    },
    options: {
      animation: {
        duration: 0 // makes it feel live
      },
      responsive: true,
      scales: {
        x: {
          type: 'time',
          time: {
            tooltipFormat: 'HH:mm:ss',
            displayFormats: {
              second: 'HH:mm:ss'
            }
          },
          title: {
            display: true,
            text: 'Time'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Power (W)'
          },
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  })
})

onBeforeUnmount(() => {
  if (chart) {
    chart.destroy()
  }
})
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
