import Joi from "joi";


export const consumerValidator = Joi.object({
    fullName: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword: Joi.ref('password'),
})
.with('password', 'confirmPassword');