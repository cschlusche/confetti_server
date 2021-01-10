import { Model } from 'https://deno.land/x/denodb/mod.ts';
import { DataTypes } from 'https://deno.land/x/denodb/mod.ts';

export class Event extends Model {
    static table = 'events'
    static timestamps = true /* It is very common to have created_at and updated_at fields in our tables. To quickly add this behavior on a model, set timestamps to true */

    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            length: 128,
            allowNull: false,
        },
        starttime: {
            type: DataTypes.DATETIME,
            allowNull: false
        },
        hosts: {
            type: DataTypes.INTEGER,
        },
        guests: {
            type: DataTypes.INTEGER,
        },
        
    }

    static event() {
        return this.hasOne(Event);
      }
}