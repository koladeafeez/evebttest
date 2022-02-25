const Joi = require('@hapi/joi');

function eventCreation(event) {
    const schema = Joi.object().keys({
      eventId: Joi.number().required(),
      type_of_event: Joi.string().required(),
      amount_paid: Joi.number().required(),
      eventCategoryId: Joi.number().required(),
      event_title: Joi.string().required(),
      experience_level: Joi.string().required(),
      event_location: Joi.string().required(),
      longitude: Joi.number().allow(null),
      latitude: Joi.number().allow(null),
      country: Joi.string().allow(null),
      state: Joi.string().allow(null),
      city: Joi.string().allow(null),
      zip_code: Joi.number().allow(null),
      description: Joi.string().required(),
      event_summary: Joi.string().required(),
      tags: Joi.array().allow(null),
      starting_date: Joi.date().required(),
      ending_date: Joi.date().required(),
      starting_time: Joi.string().required(),
      ending_time: Joi.string().required(),
      isRecuringEvent: Joi.boolean().required(),
      event_recuring_ends: Joi.date().allow(null),
      event_recuring_frequency: Joi.string().allow(null),
      expected_no_of_attendees: Joi.number().required(),
      event_vendors: Joi.array().allow(null),
      event_ticket_types: Joi.array().allow(null),
      isListed: Joi.number(),
    });
  
    return schema.validate(event);
}

function eventUpdate(event) {
  const schema = Joi.object().keys({
    type_of_event: Joi.string().required(),
    eventCategoryId: Joi.number().required(),
    event_title: Joi.string().required(),
    experience_level: Joi.string().required(),
    event_location: Joi.string().required(),
    longitude: Joi.number().allow(null),
    latitude: Joi.number().allow(null),
    country: Joi.string().allow(null),
    state: Joi.string().allow(null),
    city: Joi.string().allow(null),
    zip_code: Joi.number().allow(null),
    description: Joi.string().required(),
    event_summary: Joi.string().required(),
    tags: Joi.array().allow(null),
    starting_date: Joi.date().required(),
    ending_date: Joi.date().required(),
    starting_time: Joi.string().required(),
    ending_time: Joi.string().required(),
    isRecuringEvent: Joi.boolean().required(),
    event_recuring_ends: Joi.date().allow(null),
    event_recuring_frequency: Joi.string().allow(null),
    expected_no_of_attendees: Joi.number().required(),
    event_vendors: Joi.array().allow(null),
    event_ticket_types: Joi.array().allow(null),
    isListed: Joi.number(),
  });

  return schema.validate(event);
}

function disapproveEvent(event) {
  const schema = Joi.object().keys({
    reason_for_disapproval: Joi.string().required()
  });

  return schema.validate(event);
}

function sortByDate(dates) {
  const schema = Joi.object().keys({
    from: Joi.date().required(),
    to: Joi.date().required()
  });

  return schema.validate(dates);
}

function sortByLocation(location) {
  const schema = Joi.object().keys({
    country: Joi.string().required(),
    state: Joi.string().allow(null)
  });

  return schema.validate(location);
}

module.exports = {
    eventCreation, eventUpdate, disapproveEvent, sortByDate, sortByLocation
};