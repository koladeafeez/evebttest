const _ = require('lodash');
const validate = require('./validation');
const responseMessage = require('../helpers/responseMessages');
const variables = require('../helpers/parameters');
const dbQueries = require('./dbQueries');
const helpers = require('../helpers/utilities');
const mailService = require('../helpers/mailServices');

const ticket = {
    //Purchase event ticket
    buyTicket: async (req, res) => {
        const { error } = validate.attendee(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        let event = await dbQueries.fetchEventById(req.body.eventId);
        if(!event) return responseMessage.badRequest('No event with the given Id was found', res);

        if(req.body.discountCoupon){
            const coupon = await dbQueries.getDiscountCoupon(req.body.discountCoupon);
            if(!coupon) return responseMessage.badRequest('Invalid or expired coupon.', res);
        }

        let attendee = _.pick(req.body, variables.attendeeDetails);
        if(req.user) attendee.userId = req.user._id;
        attendee = await dbQueries.createAttendee(attendee);

        req.body.tickets.forEach( async function (ticket) {
            let i;
            //loop through every single ticket purchased and save in the db
            for (i = 0; i < ticket.quantity; i++) {
                let ticketData = {};
                ticketData.ticket_ref_no = helpers.generateDiscountToken();
                ticketData.eventTicketId = ticket.eventTicketId;
                ticketData.attendeeId = attendee.id;
                ticketData.eventId = req.body.eventId;
                dbQueries.createAttendeeTicket(ticketData);
                
                //update no_sold on event tickets table
                let eventTicket = await dbQueries.fetchEventTicketById(ticketData.eventTicketId);
                eventTicket.no_sold += 1;
                await dbQueries.updateEventTicketSales(eventTicket);
            }            
        });

        //check if discount coupon was used
        if(req.body.discountCoupon){
            const coupon = await dbQueries.getDiscountCoupon(req.body.discountCoupon);
            if(!coupon) return responseMessage.badRequest('Invalid or expired coupon.', res);
            
            let couponUser = {};
            couponUser.eventCouponId = coupon.id;
            couponUser.attendeeId = attendee.id;
            couponUser.eventId = req.body.eventId;
            await dbQueries.createCouponUser(couponUser);

            //update no used on eventcoupons table
            coupon.number_used += 1;
            await dbQueries.updateEventCouponUsage(coupon);
        }

        //check if event is soldout and update event.
        const tickets = await dbQueries.fetchEventAttendeesTickets(req.body.eventId);
        if( tickets.length >= event.expected_no_of_attendees ) await dbQueries.markEventAsSoldOut(req.body.eventId);

        return responseMessage.success('Ticket purchased successfully!', attendee, res);
    },

    getEventAttendees: async (req, res) => {
        const event = await dbQueries.getEventById(req.params.eventId);
        if(!event) return responseMessage.notFound('No event found', res);
        if(event.userId != req.user._id) return responseMessage.unauthorized('Please contact the event owner', res);

        const attendees = await dbQueries.fetchEventAttendees(req.params.eventId);
        if(!attendees) return responseMessage.notFound('No attendees found.', res);

        return responseMessage.success('Listing all attendees', attendees, res);
    },

    getEventAttendeesByTickets: async (req, res) => {
        const event = await dbQueries.getEventById(req.params.eventId);
        if(!event) return responseMessage.notFound('No event found', res);
        if(event.userId != req.user._id) return responseMessage.unauthorized('Please contact the event owner', res);

        const tickets = await dbQueries.fetchEventAttendeesTickets(req.params.eventId);
        if(!tickets) return responseMessage.notFound('No tickets have been sold for this event.', res);

        return responseMessage.success('Listing all tickets bought for the given event', tickets, res);
    },

    checkInTicket: async (req, res) => {
        const event = await dbQueries.getEventById(req.params.eventId);
        if(!event) return responseMessage.notFound('No event found', res);
        if(event.userId != req.user._id) return responseMessage.unauthorized('Please contact the event owner', res);
        // if(event.starting_date != new Date()) return responseMessage.badRequest('Event check-in will be enabled on the event date', res);

        const ticket = await dbQueries.getSingleTicket(req.params.ticketId);
        if(!ticket) return responseMessage.notFound('No ticket found', res);
        if(ticket.isCheckedIn == 1) return responseMessage.badRequest('This ticket has been used by another person.', res);

        ticket.isCheckedIn = 1;
        await dbQueries.checkInTicket(req.params.ticketId);

        return responseMessage.success('Ticket check-in successful!', ticket, res);
    },

    checkOutTicket: async (req, res) => {
        const event = await dbQueries.getEventById(req.params.eventId);
        if(!event) return responseMessage.notFound('No event found', res);
        if(event.userId != req.user._id) return responseMessage.unauthorized('Please contact the event owner', res);
        // if(event.starting_date != new Date()) return responseMessage.badRequest('Event check-in will be enabled on the event date', res);

        const ticket = await dbQueries.getSingleTicket(req.params.ticketId);
        if(!ticket) return responseMessage.notFound('No ticket found', res);
        ticket.isCheckedIn = null;
        await dbQueries.checkOutTicket(req.params.ticketId);

        return responseMessage.success('Ticket check-in was reversed!', ticket, res);
    },

    fetchTicketByRefNo: async (req, res) => {
        const { error } = validate.ticket(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        const event = await dbQueries.getEventById(req.body.eventId);
        if(!event) return responseMessage.notFound('No event found', res);
        if(event.userId != req.user._id) return responseMessage.unauthorized('Please contact the event owner', res);

        const ticket = await dbQueries.fetchTicketByRefNo(req.body.ticket_ref_no);
        if(!ticket) return responseMessage.notFound('Invalid or expired ticket', res);
        if(ticket.eventId != req.body.eventId) return responseMessage.badRequest('Invalid or expired ticket', res);

        return responseMessage.success('Showing ticket details.', ticket, res);
    },

    //fetch an attendee's tickets
    fetchAttendeesTickets: async (req, res) => {        
        //get all ticket ref numbers and email to attendee
        const attendee = await dbQueries.fetchAllTicketsBought(req.params.attendeeId);
        if(attendee.length == 0) return responseMessage.notFound('No tickets found', res);

        const ticketRefNos = attendee.AttendeeTickets.map(ticket => { return ticket.ticket_ref_no; });
        mailService.ticketPurchaseEmail(attendee, ticketRefNos);

        return responseMessage.success('Showing ticket details.', attendee, res);
    },
};

module.exports = ticket;