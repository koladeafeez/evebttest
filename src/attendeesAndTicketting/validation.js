const Joi = require('@hapi/joi');

function attendee(token) {
    const schema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        amount_paid: Joi.number().required(),
        no_of_tickets_bought: Joi.number().required(),
        eventId: Joi.number().required(),
        payment_method: Joi.string().required(),
        tickets: Joi.array().required(),
        discountCoupon: Joi.string().allow(null),
    });
    return schema.validate(token);
}

function ticket(ticket) {
    const schema = Joi.object().keys({
        eventId: Joi.number().required(),
        ticket_ref_no: Joi.string().required()
    });
    return schema.validate(ticket);
}

module.exports = {
    attendee, ticket
};