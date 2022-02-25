const { event, Attendee, AttendeeTicket, eventCoupon, EventTickets, eventCouponUser } = require("../../models");
const variables = require('../helpers/parameters');

//create attendee
function createAttendee(attendeeData){
    return Attendee.create(attendeeData).catch(error => console.log(error.message));
}

//create new event attendee
function createAttendeeTicket(ticketData){
    return AttendeeTicket.create(ticketData).catch(error => console.log(error.message));
}

//get event by id
function fetchEventById(id){
    return event.findByPk(id).catch(error => console.log(error.message));
}

//get attendee by Id
function getAttendee(id){
    return Attendee.findByPk(id).catch(ERROR => console.log(error.message));
}

//get event discount coupon details
function getDiscountCoupon(coupon){
    return  eventCoupon.findOne({ 
       where : { coupon: coupon, deletedAt: null }, 
       attributes: variables.eventCouponDetails 
    }).catch(error => console.log(error.message));
}

//create new event
function createCouponUser(couponUser){
    return eventCouponUser.create(couponUser).catch(error => console.log(error.message));
}

function updateEventCouponUsage(coupon){
    return eventCoupon.update(
        { number_used: coupon.number_used },
        { where : { id: coupon.id, deletedAt: null } }
    ).catch(error => console.log(error.message));
}

//get event discount coupon details
function fetchAllTicketsBought(attendeeId){
    return  Attendee.findOne({ 
       where : { id: attendeeId },
       include:[{
            model: AttendeeTicket, 
            attributes: variables.attendeeTicketDetails,            
            include: { model: EventTickets, attributes: ['type_of_ticket', 'description'] }
        }]
    }).catch(error => console.log(error.message));
}

//get event discount coupon details
function getEventById(id){
    return  event.findByPk(id).catch(error => console.log(error.message));
}

function fetchEventAttendees(eventId){
    return Attendee.findAll({
        where : { eventId: eventId },
        attributes: variables.attendeeDetails, 
        include:[
            {
                model: AttendeeTicket, 
                attributes: variables.attendeeTicketDetails,            
                include: { model: EventTickets, attributes: ['type_of_ticket', 'description'] }
            }
        ]
        
    }).catch(error => console.log(error.message));
}

function fetchEventAttendeesTickets(eventId){
    return AttendeeTicket.findAll({
        where : { eventId: eventId },
        attributes: variables.attendeeTicketDetails,  
        include: [
            { model: EventTickets, attributes: ['type_of_ticket', 'description'] },
            { model: Attendee, attributes: ['firstName', 'lastName', 'email', 'phone'] },
        ]   
    }).catch(error => console.log(error.message));
}

function markEventAsSoldOut(id){
    return event.update(
        { isSoldOut: 1 },
        { where : { id: id } }
    ).catch(error => console.log(error.message));
}

function getSingleTicket(id){
    return AttendeeTicket.findOne({
        where : { id: id }, 
       attributes: variables.attendeeTicketDetails 
    }).catch(error => console.log(error.message));
}

function checkInTicket(id){
    return AttendeeTicket.update(
        { isCheckedIn: 1 },
        { where : { id: id } }
    ).catch(error => console.log(error.message));
}

function checkOutTicket(id){
    return AttendeeTicket.update(
        { isCheckedIn: 1 },
        { where : { id: id } }
    ).catch(error => console.log(error.message));
}

function fetchTicketByRefNo(refNo){
    return AttendeeTicket.findOne({
        where : { ticket_ref_no: refNo }, 
       attributes: variables.attendeeTicketDetails 
    }).catch(error => console.log(error.message));
}

function fetchEventTicketById(id){
    return EventTickets.findOne({
        where : { id: id }, 
    }).catch(error => console.log(error.message));
}

function updateEventTicketSales(eventTicket){
    return EventTickets.update(
        { no_sold: eventTicket.no_sold },
        { where : { id: eventTicket.id } }
    ).catch(error => console.log(error.message));
}

module.exports = {
    createAttendee, createAttendeeTicket, fetchEventById, getDiscountCoupon, createCouponUser, updateEventCouponUsage, fetchAllTicketsBought, 
    getEventById,fetchEventAttendees, fetchEventAttendeesTickets, markEventAsSoldOut, getSingleTicket, checkInTicket, checkOutTicket, fetchTicketByRefNo,
    fetchEventTicketById, updateEventTicketSales, getAttendee
};