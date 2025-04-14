import request from 'supertest'
import express from 'express'
import machinesRouter from '../../src/routes/machines'

const app = express()
app.use(express.json())
app.use('/machines', machinesRouter)

describe('Machines API', () => {
  let machineId: string

  it('creates a new machine', async () => {
    const res = await request(app)
      .post('/machines')
      .send({ name: 'TestMachine' })

    expect(res.status).toBe(201)
    expect(res.body.name).toBe('TestMachine')
    machineId = res.body.id
  })

  it('gets all machines', async () => {
    const res = await request(app).get('/machines')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('gets a single machine', async () => {
    const res = await request(app).get(`/machines/${machineId}`)
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(machineId)
  })

  it('deletes a machine', async () => {
    const res = await request(app).delete(`/machines/${machineId}`)
    expect(res.status).toBe(204)
  })
})
