import express, { Request, Response } from 'express';

const router = express.Router();

// GET /metrics/:id — return a list of 20 random time series points
router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const now = new Date();
  const data = [];

  for (let i = 0; i < 20; i++) {
    const timestamp = new Date(now.getTime() - i * 1000);
    const power_watts = Math.random() > 0.1 ? 100 + Math.random() * 50 : 0;
    const status = power_watts === 0 ? 'fault' : 'normal';

    data.unshift({ timestamp, power_watts, status });
  }

  res.json(data);
});

// GET /metrics/:id/live — return a single latest data point
router.get('/:id/live', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const timestamp = new Date();
  const power_watts = Math.random() > 0.1 ? 100 + Math.random() * 50 : 0;
  const status = power_watts === 0 ? 'fault' : 'normal';

  res.json({ timestamp, power_watts, status });
});

export default router;
