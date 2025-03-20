// import { Schema,model } from "mongoose";
// import normalize from 'normalize-mongoose';


// const vendorSchema = new Schema({
    
//     restaurantName: {
//         type: String,
//     },
//     fullName: {
//         type: String
//     },
//     username: {
//         type: String,
//         unique: true
//     },
//     password : {
//         type: String
//     }, 
//     whatsappContactLink : {
//         type : String
//     },
//     openHours: {
//         type : String
//     },

//     category: {
//         type: String,
//         enum: ['breakfast', 'lunch', 'dinner', 'desserts'],
//     },
//     role: { type: String, enum: ['vendor', 'consumer'], default: 'vendor' },

// },{
//     timestamps : true
// })

// vendorSchema.plugin(normalize);

// export const VendorModel = model('Vendor', vendorSchema);