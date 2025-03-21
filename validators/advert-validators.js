import Joi from "joi";

export const advertValidator = Joi.object({
  foodname: Joi.string().required(),

  description: Joi.string().required(),

  price: Joi.number().required(),

  pictures: Joi.array().items(Joi.string().required()),

  category: Joi.string()
    .valid("local", "continental", "drinks", "desserts")
    .required(),
});
