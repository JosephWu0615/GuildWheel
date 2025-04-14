import { sleep } from 'k6'
import {
  createMachine,
  getAllMachines,
  getMetrics,
  getLiveMetric,
  deleteMachine,
} from './lib/api.js'

export const options = {
  vus: 20,
  duration: '15s',
}

export default function () {
  const machine = createMachine(`LoadAll-${__VU}-${Date.now()}`)
  if (!machine) return

  sleep(0.5)

  getAllMachines()
  sleep(0.5)

  getMetrics(machine.id)
  sleep(0.5)

  getLiveMetric(machine.id)
  sleep(0.5)

  deleteMachine(machine.id)
  sleep(1)
}
