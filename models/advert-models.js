import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const advertSchema = new Schema(
  {

    vendorId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
  },
    foodname: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    pictures:[{type: String, required: true}],

    category: {
      type: String,
      enum: ['local', 'continental', 'drinks', 'desserts'],
  },
  },

  {
    timestamps: true,
  }
);

advertSchema.plugin(normalize);

export const AdvertModel = model("advert", advertSchema);
