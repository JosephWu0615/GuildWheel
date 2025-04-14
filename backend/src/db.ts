import { Pool } from 'pg';

// export const pool = new Pool({
//   user: 'a2301133',
//   host: 'localhost',
//   database: 'factory_monitor',
//   password: '',
//   port: 5432,
// });

export const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
})
