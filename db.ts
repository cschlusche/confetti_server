import { Database, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts';

const connector = new PostgresConnector({
  database: 'confetti',
  host: '127.0.0.1',
  username: 'christian',
  password: '',
  port: 5432, // optional
});

const db = new Database({connector,
  debug: true
});

export default db;