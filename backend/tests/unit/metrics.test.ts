import request from 'supertest'
import express from 'express'
import metricsRouter from '../../src/routes/metrics'

const app = express()
app.use('/metrics', metricsRouter)

describe('Metrics API', () => {
  const fakeMachineId = 'test-metric-id'

  it('returns a metric history list', async () => {
    const res = await request(app).get(`/metrics/${fakeMachineId}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body[0]).toHaveProperty('power_watts')
  })

  it('returns a live metric', async () => {
    const res = await request(app).get(`/metrics/${fakeMachineId}/live`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('power_watts')
  })
})
