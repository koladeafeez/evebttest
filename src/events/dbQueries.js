const { Sequelize, event, EventVendors, EventTickets, eventCategory, vendorServiceCategory, vendorService, User } = require("../../models");
const Op = Sequelize.Op;
const variables = require('../helpers/parameters');

//create new event
function createEvent(eventData){
    return event.create(eventData).catch(error => console.log(error.message));
}

//update event
function updateEvent(eventData){ 
    return event.update( eventData, { where : { id: eventData.id } } ).catch(error => console.log(error.message));
}

//get all approved events
function getApprovedEvents(){
    return event.findAll({ 
        where: { isApproved: true, deletedAt: null }, 
        attributes: variables.eventDetails, 
        order: [
            ['createdAt', 'DESC'],
        ],
        include:[
            { model: User, attributes: variables.userDetailsMinor },
            { model: eventCategory, attributes: variables.eventCategoryDetails },
        ]
    }).catch(error => console.log(error.message));
}

//get a user's approved events
function getUserApprovedEvents(userId){
    return event.findAll({ 
        where: { userId: userId, isApproved: true, deletedAt: null }, 
        attributes: variables.eventDetails, 
        order: [
            ['createdAt', 'DESC'],
        ],
        include:[
            { model: User, attributes: variables.userDetailsMinor },
            { model: eventCategory, attributes: variables.eventCategoryDetails },
        ]
    }).catch(error => console.log(error.message));
}

//get a user's disapproved events
function getUserDisapprovedEvents(userId){
    return event.findAll({ 
        where: { userId: userId, isApproved: false, deletedAt: null }, 
        attributes: variables.eventDetails, 
        order: [
            ['createdAt', 'DESC'],
        ],
        include:[
            { model: User, attributes: variables.userDetailsMinor },
            { model: eventCategory, attributes: variables.eventCategoryDetails },
        ]
    }).catch(error => console.log(error.message));
}

//create event vendor
function createEventVendor(eventVendor){
    return EventVendors.create(eventVendor).catch(error => console.log(error.message));
}

//create event ticket
function createEventTicket(ticket){
    return EventTickets.create(ticket).catch(error => console.log(error.message));
}

//fetch all event categories
function fetchAllEventCategories(){
    return eventCategory.findAll({ 
        where : { deleted_at: null }, 
        attributes: variables.eventCategoryDetails,
        order: [
            ['createdAt', 'DESC'],
        ],
    }).catch(error => console.log(error.message));
}

//fetch events by category
function fetchEventByCategoryId(categoryId){
    return event.findAll({ 
        where: { eventCategoryId: categoryId, isApproved: true, deletedAt: null }, 
        attributes: variables.eventDetails, 
        order: [
            ['createdAt', 'DESC'],
        ],
        include:[
            { model: User, attributes: variables.userDetailsMinor },
            { model: eventCategory, attributes: variables.eventCategoryDetails },
        ]
    }).catch(error => console.log(error.message));
}

//fetch single event details
function fetchEventDetails(eventId){
    return event.findAll({ 
        where: { id: eventId, deletedAt: null }, 
        attributes: variables.eventDetails, 
        include:[
            { model: User, attributes: variables.userDetailsMinor },
            { model: eventCategory, attributes: variables.eventCategoryDetails },
            { model: EventTickets, attributes: variables.eventTicketDetails },
            { model: EventVendors, attributes: variables.eventVendorDetails, 
                include: [
                    { model: vendorService, attributes: variables.serviceDetails,
                        include: [
                            { model: User, attributes: variables.userDetailsMinor }
                        ]
                    }, 
                ]
            },
        ]
    }).catch(error => console.log(error.message));
}

//get a user's disapproved events
function getUserUnlistedEvents(userId){
    return event.findAll({ 
        where: { userId: userId, isListed: false, deletedAt: null }, 
        attributes: variables.eventDetails, 
        order: [
            ['createdAt', 'DESC'],
        ],
        include:[
            { model: User, attributes: variables.userDetailsMinor },
            { model: eventCategory, attributes: variables.eventCategoryDetails },
        ]
    }).catch(error => console.log(error.message));
}

//get a user's events ng approval
function getUserAwaitingApprovalEvents(userId){
    return event.findAll({ 
        where: { userId: userId, isListed:1, isApproved: null, deletedAt: null }, 
        attributes: variables.eventDetails, 
        order: [
            ['createdAt', 'DESC'],
        ],
        include:[
            { model: User, attributes: variables.userDetailsMinor },
            { model: eventCategory, attributes: variables.eventCategoryDetails },
        ]
    }).catch(error => console.log(error.message));
}

//get all events for approval
function getEventsAwaitingApproval(){
    return event.findAll({ 
        where: { isApproved: null, deletedAt: null }, 
        attributes: variables.eventDetails, 
        order: [
            ['createdAt', 'ASC'],
        ],
        include:[
            { model: User, attributes: variables.userDetailsMinor },
            { model: eventCategory, attributes: variables.eventCategoryDetails },
        ]
    }).catch(error => console.log(error.message));
}

//get event by id
function fetchEventById(id){
    return event.findByPk(id).catch(error => console.log(error.message));
}

//Approve or disapprove event
function approveOrDisapproveEvent(event){
    return event.update(
        { 
            isApproved: event.isApproved,
            reason_for_disapproval: event.reason_for_disapproval,
            approvedOrDisapproved_by: event.approvedOrDisapproved_by,
            approvedOrDisapprovedAt: event.approvedOrDisapprovedAt
        },
        { where : { id: event.id, deleted_at: null } }
    ).catch(error => console.log(error.message));
}

//update event ticketing sales status
function updateEventTicketSalesStatus(event){
    return event.update(
        { isSoldOut: event.isSoldOut },
        { where : { id: event.id, deleted_at: null } }
    ).catch(error => console.log(error.message));
}

//delete event
function deleteEvent(event){
    return event.update(
        { 
            isDeleted: event.isDeleted,
            deletedAt: event.deletedAt,
            deleted_by: event.deleted_by
        },
        { where : { id: event.id, deleted_at: null } }
    ).catch(error => console.log(error.message));
}

//get all undeleted events
function getAllUndeletedEvents(){
    return event.findAll({ 
        where: { deletedAt: null }, 
        attributes: variables.eventDetails, 
        order: [
            ['createdAt', 'DESC'],
        ],
        include:[
            { model: User, attributes: variables.userDetailsMinor },
            { model: eventCategory, attributes: variables.eventCategoryDetails },
        ]
    }).catch(error => console.log(error.message));
}

//get all events due on selected dates
function fetchEventsBetweenTwoDates(date){
    return event.findAll({ 
        where: {
            starting_date: { [Op.gte]: date.from, [Op.lte]: date.to },
            isApproved: true,
            deletedAt: null
        },
        attributes: variables.eventDetails, 
        order: [
            ['createdAt', 'DESC'],
        ],
        include:[
            { model: User, attributes: variables.userDetailsMinor },
            { model: eventCategory, attributes: variables.eventCategoryDetails },
        ]
    }).catch(error => console.log(error.message));
}

//get all events due on a particular date
function fetchEventsByDate(date){
    return event.findAll({ 
        where: { starting_date: date, isApproved: true, deletedAt: null },
        attributes: variables.eventDetails, 
        order: [
            ['createdAt', 'DESC'],
        ],
        include:[
            { model: User, attributes: variables.userDetailsMinor },
            { model: eventCategory, attributes: variables.eventCategoryDetails },
        ]
    }).catch(error => console.log(error.message));
}

//fetch events by event type
function fetchEventsByEventType(eventType){
    return event.findAll({ 
        where: { type_of_event: eventType, isApproved: true, deletedAt: null },
        attributes: variables.eventDetails, 
        order: [
            ['createdAt', 'DESC'],
        ],
        include:[
            { model: User, attributes: variables.userDetailsMinor },
            { model: eventCategory, attributes: variables.eventCategoryDetails },
        ]
    }).catch(error => console.log(error.message));
}

//fetch events by event type
function fetchEventsByLocation(location){
    return event.findAll({ 
        where: {
            [Op.or]: [
              { state: location.state },
              { country: location.country }
            ],
            isApproved: true, deletedAt: null
          },
        attributes: variables.eventDetails, 
        order: [
            ['createdAt', 'DESC'],
        ],
        include:[
            { model: User, attributes: variables.userDetailsMinor },
            { model: eventCategory, attributes: variables.eventCategoryDetails },
        ]
    }).catch(error => console.log(error.message));
}

//fetch events by event type
function fetchEventsByLocationWithState(location){
    return event.findAll({ 
        where: {
            [Op.and]: [
              { state: location.state },
              { country: location.country }
            ],
            isApproved: true, deletedAt: null
          },
        attributes: variables.eventDetails, 
        order: [
            ['createdAt', 'DESC'],
        ],
        include:[
            { model: User, attributes: variables.userDetailsMinor },
            { model: eventCategory, attributes: variables.eventCategoryDetails },
        ]
    }).catch(error => console.log(error.message));
}

module.exports = {
    createEvent, updateEvent, createEventVendor, createEventTicket, fetchAllEventCategories, fetchEventByCategoryId,
    fetchEventDetails, getApprovedEvents, getUserApprovedEvents, getUserDisapprovedEvents, getUserUnlistedEvents, getUserAwaitingApprovalEvents,
    getEventsAwaitingApproval, fetchEventById, approveOrDisapproveEvent, updateEventTicketSalesStatus, deleteEvent, getAllUndeletedEvents,
    fetchEventsBetweenTwoDates, fetchEventsByDate, fetchEventsByEventType, fetchEventsByLocation, fetchEventsByLocationWithState
};