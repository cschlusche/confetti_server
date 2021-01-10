import {User} from './User.ts'
import {Event} from './Event.ts'
import {EventParticipant} from './EventParticipant.ts'

import { Database, Relationships } from 'https://deno.land/x/denodb/mod.ts';

const db = new Database('postgres', {
    database: 'confetti',
    host: '127.0.0.1',
    username: 'christian',
    password: '',
    port: 5432, // optional
  });

db.link([EventParticipant, User, Event]);

db.sync();