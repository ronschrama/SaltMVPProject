const { Pool, Client } = require('pg');
const pool =  new Pool();

const res = await pool.query('SELECT NOW()');
await pool.end();

const client = new Client();
await client.connect();

const res = await client.query('SELECT NOW()');
await client.end();

