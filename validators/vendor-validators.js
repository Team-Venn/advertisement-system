import Joi from "joi";


export const vendorValidator = Joi.object({
    restaurantName: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword: Joi.ref('password'),
    whatsappContactLink: Joi.string().required(),
    openHours: Joi.string().required(),
    category: Joi.string().required()

})
.with('password', 'confirmPassword');