import express from 'express';
import machinesRouter from './routes/machines';
import metricsRouter from './routes/metrics';
import cors from 'cors';

const app = express();
app.use(express.json());

// ✅ Allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:5173', // your Vue dev server
}));



app.use('/machines', machinesRouter);
app.use('/metrics', metricsRouter);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
