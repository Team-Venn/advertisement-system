import Joi from "joi";

export const userValidator = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  confirmPassword: Joi.ref("password"),
  role: Joi.string().valid("vendor", "consumer").required(),
  shopName: Joi.string().optional(),
  socialMediaLink: Joi.string().optional(),
  openHours: Joi.string().optional(),
  profilePicture: Joi.string().optional(), // Adjust according to how you're storing it
}).with("password", "confirmPassword");

export const loginUserValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const profileValidator = Joi.object({
  socialMediaLink: Joi.string().optional(),
  openHours: Joi.string().optional(),
  profilePicture: Joi.string().optional(),
})
