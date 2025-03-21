import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "consumer",
      enum: ["vendor", "consumer"],

      // required: true
    },
    // Vendor specific fields
    shopName: {
      type: String,
      required: function () {
        return this.role === "vendor";
      },
    },
    socialMediaLink: {
      type: String,
      required: function () {
        return this.role === "vendor";
      },
    },
    openHours: {
      type: String,
      required: function () {
        return this.role === "vendor";
      },
    },
    profilePicture: {
      type: String,
      required: function () {
        return this.role === "vendor";
      },
    },
    // adverts : [{ type: Schema.Types.ObjectId, ref: 'advert' }]
    verificationCode: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(normalize);

export const UserModel = model("User", userSchema);
