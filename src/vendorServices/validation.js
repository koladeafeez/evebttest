const Joi = require('@hapi/joi');

function createService(service) {
    const schema = Joi.object().keys({
        vendorServiceCategoryId: Joi.string().required(),
        description: Joi.string().required(),
        experience_level: Joi.string().required(),
        price: Joi.string().required(),
        approval_status: Joi.string().allow(null),
        listing_status: Joi.string().allow(null),
    });
  
    return schema.validate(service);
}


module.exports = {
    createService
};