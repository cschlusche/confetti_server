// deno run --allow-net './models/_sync_db.ts'

import User from './User.ts'
import Event from './Event.ts'
import EventParticipant from './EventParticipant.ts'

import db from '../db.ts';

/*
 * CREATE TABLES based on model
 */

// linking: add models to database instance
db.link([User, Event, EventParticipant]);

// syncing: create tables in database
await db.sync();