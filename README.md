# 🏭 GuideWheel — Real-Time Factory Monitoring Demo

This project simulates a mini GuideWheel-style system for monitoring machine performance in real time using a power "heartbeat" stream. It features:

- 🔧 Machine management with CRUD APIs
- 📈 Real-time metrics visualization (heartbeat-style line charts)
- 🚀 Performance/load testing with `k6`

---

## 📦 Tech Stack

| Layer       | Technology                         |
|-------------|------------------------------------|
| Frontend    | Vue 3 + Vite + Chart.js            |
| Backend     | Node.js + Express + TypeScript     |
| Database    | PostgreSQL                         |
| Performance | k6                                 |

---

## 🚀 Features

- Add, view, and delete machines
- Simulate real-time power readings (heartbeat-style)
- Live chart updates every second
- Performance testing via `k6` for both metrics and machines APIs

---

## 📁 Project Structure

```text
### 📁 Project Structure

```text
GuildWheel/
├── backend/                      # Express backend (TypeScript)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── machines.ts
│   │   │   └── metrics.ts
│   │   └── index.ts
│   └── tests/
│       ├── unit/
│       │   ├── machines.test.ts
│       │   └── metrics.test.ts
│       └── integration/
│           └── app.integration.test.ts
├── frontend/                     # Vue 3 dashboard UI
│   └── src/
│       └── components/
│           ├── LineChart.vue
│           └── MachineDashboard.vue
├── k6/                           # Performance test scripts (k6)
│   ├── load-machines.js
│   ├── load-metrics.js
│   ├── load-all.js
│   └── lib/
│       └── api.js
└── README.md

```

---

## 🛠️ Getting Started

### 🔹 1. Backend

```bash
cd backend
npm install
npx ts-node src/index.ts
```
#### Ensure PostgreSQL is running and factory_monitor DB is created.

### 🔹 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
#### Access at http://localhost:5173

### 📊 Performance Testing
🔹 Install k6
```bash
brew install k6   # or use Docker
```
🔹 Run All Tests
```bash
k6 run k6/load-all.js
```

### Scripts:

- k6/load-machines.js: Load test CRUD for machines

- k6/load-metrics.js: Simulate polling metrics endpoints

- k6/load-all.js: Combined end-to-end test

✅ API Endpoints

### 🛠️ Machines API

| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| GET    | `/machines`      | List all machines   |
| POST   | `/machines`      | Create a machine    |
| GET    | `/machines/:id`  | Get a machine       |
| PUT    | `/machines/:id`  | Update a machine    |
| DELETE | `/machines/:id`  | Delete a machine    |

---

### 📈 Metrics API

| Method | Endpoint                 | Description                  |
|--------|--------------------------|------------------------------|
| GET    | `/metrics/:id`           | Get historical metrics       |
| GET    | `/metrics/:id/live`      | Get single latest data point |

### 📌 Notes

- Metrics are **randomly generated** to simulate machine power draw.
- There is **no authentication or user management** — this is intended for demo/testing only.
- The database includes two main tables: `machines` and `machine_readings`.
- The `machine_readings` table uses **`ON DELETE CASCADE`** to automatically remove metrics when a machine is deleted.

### 🧪 Testing
🔹 Unit Tests (Vitest)

```bash
cd backend
npm run test:unit
```
Test coverage includes route handlers for both machines and metrics.

🔹 Integration Tests
Simulate real API flows with database (machines + metrics).

Located in: `backend/tests/integration/`

```bash
npm run test:integration
```
Test coverage includes route handlers for both machines and metrics.

🔹 Performance Tests (k6)
Run realistic API load simulations:

```bash
npm run test:perf              # Full workflow test
npm run test:perf:machines     # Machines-only test
npm run test:perf:metrics      # Metrics-only test
```
