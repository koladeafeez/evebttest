const Joi = require('@hapi/joi');

function createCoupon(token) {
    const schema = Joi.object().keys({
        eventId: Joi.number().required(),
        percentage_discount: Joi.number().required(),
        max_no_of_usage: Joi.number().allow(null),
        expires_on: Joi.string().allow(null)
    });
  
    return schema.validate(token);
}

function verifyCoupon(token) {
    const schema = Joi.object().keys({
        eventId: Joi.number().required(),
        coupon: Joi.string().required()
    });
  
    return schema.validate(token);
}

module.exports = {
    createCoupon, verifyCoupon
};