<template>
  <div class="mt-4">
    <LineChart :data="metrics" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import LineChart from './LineChart.vue'

const props = defineProps({
  machineId: String
})

const metrics = ref([])
let interval = null

const fetchLive = async () => {
  const { data } = await axios.get(`http://localhost:3000/metrics/${props.machineId}/live`)
  metrics.value.push(data)
  if (metrics.value.length > 50) metrics.value.shift()
}

const loadInitial = async () => {
  const res = await axios.get(`http://localhost:3000/metrics/${props.machineId}`)
  metrics.value = res.data
  interval = setInterval(fetchLive, 1000)
}

onMounted(loadInitial)
onBeforeUnmount(() => clearInterval(interval))
</script>
