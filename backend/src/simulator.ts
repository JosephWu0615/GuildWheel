import { pool } from './db';
import { v4 as uuidv4 } from 'uuid';

export async function simulateReading(machine_id: string) {
  const power = Math.random() > 0.1 ? 100 + Math.random() * 50 : 0;
  const status = power === 0 ? 'fault' : 'normal';

  await pool.query(
    'INSERT INTO machine_readings (machine_id, timestamp, power_watts, status) VALUES ($1, NOW(), $2, $3)',
    [machine_id, power, status]
  );
}
