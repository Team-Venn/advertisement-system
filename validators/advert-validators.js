import Joi from "joi";
import joiObjectid from "joi-objectid";

const JoiObjectId = joiObjectid(Joi);

export const advertValidator = Joi.object({
    
    vendorId: JoiObjectId().required(),
    
    foodname: Joi.string().required(),

    description: Joi.string().required(),

    price: Joi.number().required(),

    pictures :Joi.array().items(Joi.string().required()),

    category: Joi.string().valid('local', 'continental', 'drinks', 'desserts').required()
});