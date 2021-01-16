import { Model } from 'https://deno.land/x/denodb/mod.ts';
import { DataTypes } from 'https://deno.land/x/denodb/mod.ts';
import { Relationships } from 'https://deno.land/x/denodb/mod.ts';

import Event from './Event.ts';
import User from './User.ts';

export class EventParticipant extends Model {
    static table = 'event_participant'
    static timestamps = true /* It is very common to have created_at and updated_at fields in our tables. To quickly add this behavior on a model, set timestamps to true */

    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role: DataTypes.enum(['host', 'guest']),
        eventid: Relationships.belongsTo(Event),
        userid: Relationships.belongsTo(User),
        
    }
}

export default EventParticipant