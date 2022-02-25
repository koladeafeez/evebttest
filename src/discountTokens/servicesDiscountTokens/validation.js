const Joi = require('@hapi/joi');

function createToken(token) {
    const schema = Joi.object().keys({
        VendorServiceId: Joi.number().required(),
        percentage_discount: Joi.number().required(),
        max_number_of_usage: Joi.number().allow(null),
        expires_on: Joi.string().allow(null)
    });
  
    return schema.validate(token);
}

module.exports = {
    createToken
};