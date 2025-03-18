import { Schema,model } from "mongoose";
import normalize from 'normalize-mongoose';


const vendorSchema = new Schema({
    
    restaurantName: {
        type: String,
    },
    username: {
        type: String,
        unique: true
    },
    password : {
        type: String
    }, 
    whatsappContactLink : {
        type : String
    },
    openHours: {
        type : String
    },

    category: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'desserts'],  // Predefined categories
    }

},{
    timestamps : true
})

vendorSchema.plugin(normalize);

export const VendorModel = model('Vendor', vendorSchema);