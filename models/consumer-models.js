import { Schema, model } from "mongoose";
import normalize from 'normalize-mongoose';

const consumerSchema = new Schema({

    fullName: {
        type: String,
        unique: true
    },
    username : {
        type: String,
        unique: true
    },
    password : {
        type: String
    }
},{
    timestamps: true
})

consumerSchema.plugin(normalize);

export const ConsumerModel = model('Consumer', consumerSchema);