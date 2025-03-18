import { Schema, model } from "mongoose";

const advertSchema = new Schema(
  {
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

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "desserts"], // Predefined categories
    },
  },

  {
    timestamps: true,
  }
);

export const AdvertModel = model("advert", advertSchema);
