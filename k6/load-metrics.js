import { sleep } from 'k6'
import {
  createMachine,
  getMetrics,
  getLiveMetric,
  deleteMachine,
} from './lib/api.js'

export const options = {
  vus: 10,
  duration: '10s',
}

export default function () {
  const machine = createMachine(`MetricsLoad-${__VU}-${Date.now()}`)
  if (!machine) return

  sleep(0.5)

  getMetrics(machine.id)
  sleep(0.5)

  getLiveMetric(machine.id)
  sleep(0.5)

  deleteMachine(machine.id)
  sleep(1)
}
