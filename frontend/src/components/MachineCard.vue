<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1>🛠️ Machines</h1>

    <!-- Create Machine -->
    <form @submit.prevent="createMachine" class="my-4">
      <input v-model="newMachineName" placeholder="Enter machine name" class="border p-2 mr-2" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2">Add Machine</button>
    </form>

    <!-- Machine List -->
    <ul>
      <li v-for="machine in machines" :key="machine.id" class="mb-2 flex items-center gap-3">
        <span class="font-medium">{{ machine.name }}</span>
        <button @click="viewMetrics(machine.id)" class="text-blue-600 underline">View Metrics</button>
        <button @click="deleteMachine(machine.id)" class="text-red-500 underline">Delete</button>
      </li>
    </ul>

    <!-- Chart -->
    <div v-if="metrics.length" class="mt-6">
      <h2 class="text-lg font-semibold">📊 Metrics</h2>
      <LineChart :data="metrics" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import LineChart from '../components/LineChart.vue'

const machines = ref([])
const metrics = ref([])
const newMachineName = ref('')
let liveInterval = null

// Load all machines
const loadMachines = async () => {
  const res = await axios.get('http://localhost:3000/machines')
  machines.value = res.data
}

// Create a new machine
const createMachine = async () => {
  if (!newMachineName.value) return
  await axios.post('http://localhost:3000/machines', { name: newMachineName.value })
  newMachineName.value = ''
  await loadMachines()
}

// Delete a machine and its metrics
const deleteMachine = async (id) => {
  clearInterval(liveInterval)
  await axios.delete(`http://localhost:3000/machines/${id}`)
  await loadMachines()
  metrics.value = []
}

// View live-updating metrics
const viewMetrics = async (id) => {
  clearInterval(liveInterval)
  const res = await axios.get(`http://localhost:3000/metrics/${id}`)
  metrics.value = res.data

  liveInterval = setInterval(async () => {
    const { data } = await axios.get(`http://localhost:3000/metrics/${id}/live`)
    metrics.value.push(data)
    if (metrics.value.length > 50) {
      metrics.value.shift()
    }
  }, 1000)
}

// Cleanup when leaving the page/component
onBeforeUnmount(() => {
  clearInterval(liveInterval)
})

onMounted(loadMachines)
</script>
