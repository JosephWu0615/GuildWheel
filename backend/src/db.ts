import { Pool } from 'pg';

export const pool = new Pool({
  user: 'a2301133',
  host: 'localhost',
  database: 'factory_monitor',
  password: '',
  port: 5432,
});
