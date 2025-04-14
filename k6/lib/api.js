import http from 'k6/http'
import { check } from 'k6'

export function createMachine(name = 'Test') {
  const res = http.post('http://localhost:3000/machines', JSON.stringify({ name }), {
    headers: { 'Content-Type': 'application/json' },
  })

  check(res, {
    'created machine': r => r.status === 201,
  })

  return res.status === 201 ? JSON.parse(res.body) : null
}

export function deleteMachine(id) {
  const res = http.del(`http://localhost:3000/machines/${id}`)
  check(res, {
    'deleted machine': r => r.status === 204,
  })
}

export function getAllMachines() {
  const res = http.get('http://localhost:3000/machines')
  check(res, {
    'fetched machines': r => r.status === 200,
  })
  return res
}

export function getMetrics(id) {
  const res = http.get(`http://localhost:3000/metrics/${id}`)
  check(res, {
    'got metrics list': r => r.status === 200,
  })
  return res
}

export function getLiveMetric(id) {
  const res = http.get(`http://localhost:3000/metrics/${id}/live`)
  check(res, {
    'got live metric': r => r.status === 200,
  })
  return res
}
