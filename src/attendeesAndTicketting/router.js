const express = require('express');
const router = express.Router();
const ticketService = require('./service');
const auth = require('../middlewares/auth');
const authOptional = require('../middlewares/authOptional');
const accessControl = require('../middlewares/accessControl');

//purchase ticket
router.post( '/buyTicket', authOptional, ticketService.buyTicket );

//purchase ticket
router.get( '/myTickets/:attendeeId', authOptional, ticketService.fetchAttendeesTickets );

//fetch event attendees
router.get( '/:eventId', [auth, accessControl.isEventHost], ticketService.getEventAttendees );

//Get all tickets bought by attendees for an event
router.get( '/tickets/:eventId', [auth, accessControl.isEventHost], ticketService.getEventAttendeesByTickets );

//Check-in an attendee ticket (on event day)
router.put( '/checkIn/:eventId/:ticketId', [auth, accessControl.isEventHost], ticketService.checkInTicket );

//Reverse Check-in of an attendee ticket (on event day) incase of mistaked check-in
router.put( '/checkOut/:eventId/:ticketId', [auth, accessControl.isEventHost], ticketService.checkOutTicket );

//get attendee ticket by ticket ref number
router.post( '/ticket', [auth, accessControl.isEventHost], ticketService.fetchTicketByRefNo );

module.exports = router;