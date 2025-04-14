import express from 'express';
import machinesRouter from './routes/machines';
import metricsRouter from './routes/metrics';
import cors from 'cors';

const app = express();
app.use(express.json());

// ✅ Allow requests from your frontend
app.use(cors({ origin: '*' }));


app.use('/machines', machinesRouter);
app.use('/metrics', metricsRouter);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
