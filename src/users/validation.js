const Joi = require('@hapi/joi');

function businessRegistration(user) {
    const schema = Joi.object().keys({
      roleId: Joi.number().required(),
      title: Joi.string().allow(null),
      firstName: Joi.string().required(),
      middleName: Joi.string().allow(null),
      lastName: Joi.string().required(),
      gender: Joi.string().required(),
      email: Joi.string().required().email(),
      phone: Joi.string().required(),
      type_of_business: Joi.string().required(),
      business_name: Joi.string().required(),
      password: Joi.string().min(4).required(),
      categoryType: Joi.string().required(),
    });
  
    return schema.validate(user);
}

function institutionRegistration(user) {
    const schema = Joi.object().keys({
      roleId: Joi.number().required(),
      title: Joi.string().allow(null),
      firstName: Joi.string().required(),
      middleName: Joi.string().allow(null),
      lastName: Joi.string().required(),
      gender: Joi.string().required(),
      email: Joi.string().required().email(),
      phone: Joi.string().required(),
      type_of_business: Joi.string().required(),
      business_name: Joi.string().required(),
      password: Joi.string().min(4).required(),
      categoryType: Joi.string().required(),
    });
  
    return schema.validate(user);
}

function userRegistration(user) {
    const schema = Joi.object().keys({
      roleId: Joi.number().required(),
      title: Joi.string().allow(null),
      firstName: Joi.string().required(),
      gender: Joi.string().allow(null),
      middleName: Joi.string().allow(null),
      lastName: Joi.string().required(),
      email: Joi.string().required().email(),
      phone: Joi.string().allow(null),
      password: Joi.string().min(4).required(),
    });
  
    return schema.validate(user);
}

function login(user){
    const schema = Joi.object().keys({ 
        email: Joi.string().required().email(), 
        password: Joi.string().min(4).max(255).required()
    });
  
    return schema.validate(user);
}

function password(password){
    const schema = Joi.object().keys({ 
        password: Joi.string().min(7).max(255).required()
    });
  
    return schema.validate(password);
}

function roleUpdate(user){
    const schema = Joi.object().keys({ 
        userId: Joi.number().required(), 
        roleId: Joi.number().required(), 
    });
  
    return schema.validate(user);
}

module.exports = {
    businessRegistration, userRegistration, login, password, institutionRegistration, roleUpdate
};