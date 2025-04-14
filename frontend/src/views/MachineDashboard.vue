<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">🛠️ Machines</h1>

    <!-- Input Row -->
    <form @submit.prevent="createMachine" class="mb-6 flex gap-2">
      <input v-model="newMachineName" placeholder="Enter machine name" class="border p-2 flex-1" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2">Add Machine</button>
    </form>

    <!-- Machines List -->
    <div v-for="machine in machines" :key="machine.id" class="mb-8 border-b pb-4">
      <div class="flex justify-between items-center">
        <span class="font-semibold text-lg">{{ machine.name }}</span>
        <div class="space-x-2">
          <button @click="toggleMetrics(machine.id)" class="text-blue-600 underline">View Metrics</button>
          <button @click="deleteMachine(machine.id)" class="text-red-500 underline">Delete</button>
        </div>
      </div>

      <div v-if="visibleMetrics[machine.id]">
        <MachineChart :machineId="machine.id" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import MachineChart from '../components/MachineChart.vue'

const machines = ref([])
const newMachineName = ref('')
const visibleMetrics = ref({})

// Load all machines
const loadMachines = async () => {
  const res = await axios.get('http://localhost:3000/machines')
  machines.value = res.data
}

// Add new machine
const createMachine = async () => {
  if (!newMachineName.value) return
  await axios.post('http://localhost:3000/machines', { name: newMachineName.value })
  newMachineName.value = ''
  await loadMachines()
}

// Delete machine and stop its chart
const deleteMachine = async (id) => {
  delete visibleMetrics.value[id]
  await axios.delete(`http://localhost:3000/machines/${id}`)
  await loadMachines()
}

// Toggle metrics chart visibility
const toggleMetrics = (id) => {
  visibleMetrics.value[id] = !visibleMetrics.value[id]
}

onMounted(loadMachines)
</script>
