import Joi from "joi";




export const advertValidator = Joi.object({
    
    foodname: Joi.string().required(),

    description: Joi.string().required(),

    price: Joi.number().required(),

    image: Joi.string().required(),

    category:Joi.string().required(),
});