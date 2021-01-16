// deno run --allow-net './models/_create_data.ts'

import db from '../db.ts';

import User from './User.ts'

db.link([User]);

await User.create({
    email: 'christian@schlusche.net',
    password: 'pass'
  }
)