const Joi = require('joi')

const validateCreateUser = (data) => {
    
    const schema = Joi.object({
        firstname: Joi.string().min(4).max(30),
        othername: Joi.string().min(4).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', ] } }).required(),
        phone: Joi.string().min(11).max(14).required(),

    })

    return schema.validate(data);


}


module.exports = { validateCreateUser }