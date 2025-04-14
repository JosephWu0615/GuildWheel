import { sleep } from 'k6'
import {
  createMachine,
  getAllMachines,
  deleteMachine,
} from './lib/api.js'

export const options = {
  vus: 10,
  duration: '10s',
}

export default function () {
  const machine = createMachine(`MachineLoad-${__VU}-${Date.now()}`)
  if (!machine) return

  sleep(0.5)

  getAllMachines()
  sleep(0.5)

  deleteMachine(machine.id)
  sleep(1)
}
