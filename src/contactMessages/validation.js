const Joi = require('@hapi/joi');

function createMessage(message){
    const schema = Joi.object().keys({ 
        firstName: Joi.string().required(), 
        lastName: Joi.string().required(), 
        phone: Joi.string().required(), 
        email: Joi.string().email().allow(null), 
        message: Joi.string().required(), 
        country: Joi.string().required(), 
        company: Joi.string().allow(null)
    });
  
    return schema.validate(message);
}

module.exports = {
    createMessage
};