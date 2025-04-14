import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import express from 'express'
import machinesRouter from '../../src/routes/machines'
import metricsRouter from '../../src/routes/metrics'
import { pool } from '../../src/db'

// 👷 Integration app with all routes mounted
const app = express()
app.use(express.json())
app.use('/machines', machinesRouter)
app.use('/metrics', metricsRouter)

let testMachineId: string

describe('🔁 Integration: Machines + Metrics API', () => {
  beforeAll(async () => {
    // optional setup
  })

  afterAll(async () => {
    if (testMachineId) {
      await pool.query('DELETE FROM machines WHERE id = $1', [testMachineId])
    }
    await pool.end()
  })

  it('should create a machine and return ID', async () => {
    const res = await request(app).post('/machines').send({ name: 'IntegrationBot' })
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    testMachineId = res.body.id
  })

  it('should fetch time series metrics for machine', async () => {
    const res = await request(app).get(`/metrics/${testMachineId}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body[0]).toHaveProperty('timestamp')
    expect(res.body[0]).toHaveProperty('power_watts')
  })

  it('should return a live reading for machine', async () => {
    const res = await request(app).get(`/metrics/${testMachineId}/live`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('timestamp')
    expect(res.body).toHaveProperty('power_watts')
    expect(res.body).toHaveProperty('status')
  })

  it('should delete the machine', async () => {
    const res = await request(app).delete(`/machines/${testMachineId}`)
    expect(res.status).toBe(204)
  })
})
