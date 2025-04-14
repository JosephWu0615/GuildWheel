"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
// export const pool = new Pool({
//   user: 'a2301133',
//   host: 'localhost',
//   database: 'factory_monitor',
//   password: '',
//   port: 5432,
// });
exports.pool = new pg_1.Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
});
