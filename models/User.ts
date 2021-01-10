import { Model } from 'https://deno.land/x/denodb/mod.ts';
import { DataTypes } from 'https://deno.land/x/denodb/mod.ts';

export class User extends Model {
    static table = 'users'
    static timestamps = true /* It is very common to have created_at and updated_at fields in our tables. To quickly add this behavior on a model, set timestamps to true */

    static fields = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: DataTypes.string(64),
        password: {
            type: DataTypes.STRING,
            length: 64,
            allowNull: false
        }
    }

    static user() {
        return this.hasOne(User);
      }
}