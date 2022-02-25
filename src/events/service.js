const _ = require('lodash');
const validate = require('./validation');
const responseMessage = require('../helpers/responseMessages');
const variables = require('../helpers/parameters');
const dbQueries = require('./dbQueries');

const event = {
    //create event
    uploadEventBanner: async (req, res) => {
        if(!req.files || !req.files.event_banner) return responseMessage.badRequest('Event Banner cannot be empty.', res);
        let event = {};
        event.event_banner = req.files.event_banner[0].path;
        event.userId = req.user._id;
        event.isListed = 0;
        event = await dbQueries.createEvent(event);

        return responseMessage.success('Event banner has been uploaded successfully!', event, res);
    },

    //complete event creation
    create: async (req, res) => {
        const { error } = validate.eventCreation(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        let event = await dbQueries.fetchEventById(req.body.eventId);
        if(!event) return responseMessage.notFound('No event with the given Id was found', res);
        const eventId = event.id;

        eventData = _.pick(req.body, variables.eventRegDetails);
        let eventUpdate = {};
        eventUpdate.id = eventId;
        eventUpdate.type_of_event = eventData.type_of_event;
        eventUpdate.amount_paid = eventData.amount_paid;
        eventUpdate.eventCategoryId = eventData.eventCategoryId;
        eventUpdate.event_title = eventData.event_title;
        eventUpdate.experience_level = eventData.experience_level;
        eventUpdate.event_location = eventData.event_location;
        eventUpdate.longitude = eventData.longitude;
        eventUpdate.latitude = eventData.latitude; 
        eventUpdate.country = eventData.country;
        eventUpdate.state = eventData.state;
        eventUpdate.city = eventData.city;
        eventUpdate.zip_code = eventData.zip_code;
        eventUpdate.description = eventData.description;
        eventUpdate.event_summary = eventData.event_summary;
        eventUpdate.starting_date = eventData.starting_date;
        eventUpdate.ending_date = eventData.ending_date;
        eventUpdate.starting_time = eventData.starting_time;
        eventUpdate.ending_time = eventData.ending_time;
        eventUpdate.isRecuringEvent = eventData.isRecuringEvent;
        eventUpdate.event_recuring_ends = eventData.event_recuring_ends;
        eventUpdate.event_recuring_frequency = eventData.event_recuring_frequency;
        eventUpdate.expected_no_of_attendees = eventData.expected_no_of_attendees;
        eventUpdate.isListed = eventData.isListed;
        eventUpdate.tags = eventData.tags.toString();
        await dbQueries.updateEvent(eventUpdate);

        //create event vendors
        if(req.body.event_vendors){
            req.body.event_vendors.forEach( async function (eventVendor) {
                let vendor = {};
                vendor.vendorServiceId = eventVendor;
                vendor.eventId = eventId;
                await dbQueries.createEventVendor(vendor);
            });
        }

        //create event tickets
        if(req.body.event_ticket_types){
            req.body.event_ticket_types.forEach( async function (ticketType) {
                let ticket = {};
                ticket.type_of_ticket = ticketType.type_of_ticket;
                ticket.available_slots = ticketType.available_slots;
                ticket.no_sold = 0;
                ticket.amount = ticketType.amount;
                ticket.description = ticketType.description;
                ticket.eventId = eventId;
                await dbQueries.createEventTicket(ticket);
            });
        }
        
        return responseMessage.success('Event created!', eventUpdate, res);
    },

    //update event
    update: async (req, res) => {
        const { error } = validate.eventUpdate(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        let event = await dbQueries.fetchEventById(req.params.id);
        if(!event) return responseMessage.notFound('No event with the given Id was found', res);
        if(event.userId != req.user._id) return responseMessage.forbidden('Access denied', res);
        if(event.isApproved == 1) return responseMessage.badRequest("Sorry, you can't edit an already approved event", res);
        
        eventData = _.pick(req.body, variables.eventRegDetails);
        const eventId = event.id;
        let eventUpdate = {};

        eventUpdate.id = eventId;
        eventUpdate.type_of_event = eventData.type_of_event;
        eventUpdate.amount_paid = eventData.amount_paid;
        eventUpdate.eventCategoryId = eventData.eventCategoryId;
        eventUpdate.event_title = eventData.event_title;
        eventUpdate.experience_level = eventData.experience_level;
        eventUpdate.event_location = eventData.event_location;
        eventUpdate.longitude = eventData.longitude;
        eventUpdate.latitude = eventData.latitude; 
        eventUpdate.country = eventData.country;
        eventUpdate.state = eventData.state;
        eventUpdate.city = eventData.city;
        eventUpdate.zip_code = eventData.zip_code;
        eventUpdate.description = eventData.description;
        eventUpdate.event_summary = eventData.event_summary;
        eventUpdate.starting_date = eventData.starting_date;
        eventUpdate.ending_date = eventData.ending_date;
        eventUpdate.starting_time = eventData.starting_time;
        eventUpdate.ending_time = eventData.ending_time;
        eventUpdate.isRecuringEvent = eventData.isRecuringEvent;
        eventUpdate.event_recuring_ends = eventData.event_recuring_ends;
        eventUpdate.event_recuring_frequency = eventData.event_recuring_frequency;
        eventUpdate.expected_no_of_attendees = eventData.expected_no_of_attendees;
        eventUpdate.isListed = eventData.isListed;
        eventUpdate.tags = eventData.tags.toString(); 
        await dbQueries.updateEvent(eventUpdate);

        return responseMessage.success('Event updated!', eventUpdate, res);
    },

    //Get all approved events
    getApprovedEvents: async (req, res) => {
        const events = await dbQueries.getApprovedEvents();
        if(!events) return responseMessage.notFound('No events found', res);
        return responseMessage.success('Listing all approved events.', events, res);
    },

    //Get a user's approved events
    getUserApprovedEvents: async (req, res) => {
        const events = await dbQueries.getUserApprovedEvents(req.user._id);
        if(events.length == 0) return responseMessage.notFound('No events found', res);
        return responseMessage.success("Listing a user's approved events.", events, res);
    },

    //Get a user's disapproved events
    getUserDisapprovedEvents: async (req, res) => {
        const events = await dbQueries.getUserDisapprovedEvents(req.user._id);
        if(events.length == 0) return responseMessage.notFound('No events found', res);
        return responseMessage.success("Listing a user's disapproved events.", events, res);
    },

    //Get all event Categories
    fetchAllEventCategories: async (req, res) => {
        const categories = await dbQueries.fetchAllEventCategories();
        if(!categories) return responseMessage.notFound('No categories found', res);
        return responseMessage.success('Listing all events categories.', categories, res);
    },

    //Get all events in a given category
    fetchEventByCategoryId: async (req, res) => {
        const events = await dbQueries.fetchEventByCategoryId(req.params.id);
        if(!events) return responseMessage.notFound('No events found', res);
        return responseMessage.success('Listing all events in the given category.', events, res);
    },

    //Get event details
    fetchEventDetails: async (req, res) => {
        const event = await dbQueries.fetchEventDetails(req.params.id);
        if(event.length == 0) return responseMessage.notFound('The event with the given Id was not found.', res);
        return responseMessage.success('Showing the details of the event with the given Id', event, res);
    },

    //Get the current user's unlisted events (i.e user's saved events)
    getUserUnlistedEvents: async (req, res) => {
        const events = await dbQueries.getUserUnlistedEvents(req.user._id);
        if(!events) return responseMessage.notFound('No events found', res);
        return responseMessage.success('Listing user saved events.', events, res);
    },

    // get all events (created by current user) awaiting approval
    getUserAwaitingApprovalEvents: async (req, res) => {
        const events = await dbQueries.getUserAwaitingApprovalEvents(req.user._id);
        if(!events) return responseMessage.notFound('No events found', res);
        return responseMessage.success('Listing user events awaiting approval.', events, res);
    },

    // get all events awaiting approval
    getEventsAwaitingApproval: async (req, res) => {
        const events = await dbQueries.getEventsAwaitingApproval();
        if(!events) return responseMessage.notFound('No events found', res);
        return responseMessage.success('Listing all events awaiting approval.', events, res);
    },

    //approve events
    approveEvent: async (req, res) => {
        let event = await dbQueries.fetchEventById(req.params.id);
        if(!event) return responseMessage.notFound('No event found', res);
        event.reason_for_disapproval = null;
        event.isApproved = 1;
        event.approvedOrDisapproved_by = req.user._id;
        event.approvedOrDisapprovedAt = new Date();
        event = await dbQueries.approveOrDisapproveEvent(event);        
        return responseMessage.success('Event has been approved successfully!.', event, res);
    },

    // disapprove events
    disapproveEvent: async (req, res) => {
        const { error } = validate.disapproveEvent(req.body);
        if(error) return responseMessage.notFound( error.details[0].message, res );

        let event = await dbQueries.fetchEventById(req.params.id);
        if(!event) return responseMessage.badRequest('No event found', res);
        event.reason_for_disapproval = req.body.reason_for_disapproval;
        event.isApproved = 0;
        event.approvedOrDisapproved_by = req.user._id;
        event.approvedOrDisapprovedAt = new Date();
        event = await dbQueries.approveOrDisapproveEvent(event);
        return responseMessage.success('Event has been disapproved successfully!.', event, res);
    },

    //mark event as sold out
    stopEventTicketSales: async (req, res) => {
        let event = await dbQueries.fetchEventById(req.params.id);
        if(!event) return responseMessage.notFound('No event found', res);
        if(event.userId != req.user._id) return responseMessage.forbidden('Access denied', res);

        event.isSoldOut = 1;
        event = await dbQueries.updateEventTicketSalesStatus(event);
        return responseMessage.success('Ticket sales has been stopped for this Event.', event, res);
    },

    // resume event ticket sales
    resumeEventTicketSales: async (req, res) => {
        let event = await dbQueries.fetchEventById(req.params.id);
        if(!event) return responseMessage.notFound('No event found', res);
        if(event.userId != req.user._id) return responseMessage.forbidden('Access denied', res);

        event.isSoldOut = 0;
        event = await dbQueries.updateEventTicketSalesStatus(event);
        return responseMessage.success('Ticket sales has been restarted for this Event.', event, res);
    },

    // delete event
    deleteEvent: async (req, res) => {
        let event = await dbQueries.fetchEventById(req.params.id);
        if(!event) return responseMessage.notFound('No event found', res);
        if(event.userId != req.user._id) return responseMessage.forbidden('Access denied', res);
        if(event.isApproved == 1) return responseMessage.badRequest("Sorry, you can't delete an already approved event", res);

        event.isDeleted = 1;
        event.deleted_by = req.user._id;
        event.deletedAt = new Date();
        await dbQueries.deleteEvent(event);
        return responseMessage.success('Event was deleted successfully!', null, res);
    },

    getAllUndeletedEvents: async (req, res) => {
        const events = await dbQueries.getAllUndeletedEvents();
        if(!events) return responseMessage.notFound('No events found.', res);

        return responseMessage.success('Listing all undeleted events on the platform', events, res);
    },

    sortByDate: async (req, res) => {
        if(req.params.date){
            const events = await dbQueries.fetchEventsByDate(req.params.date);
            if(events.length == 0) return responseMessage.notFound('No events found.', res);

            return responseMessage.success('Listing all events due on the selected dates', events, res); 
        }

        const { error } = validate.sortByDate(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        const date = _.pick(req.body, ['from', 'to']);

        const events = await dbQueries.fetchEventsBetweenTwoDates(date);
        if(events.length == 0) return responseMessage.notFound('No events found.', res);

        return responseMessage.success('Listing all events due on the selected dates', events, res);
    },

    sortByEventType: async (req, res) => {
        const events = await dbQueries.fetchEventsByEventType(req.params.eventType);
        if(events.length == 0) return responseMessage.notFound('No events found.', res);

        return responseMessage.success('Listing all events based on the selected event type', events, res); 
    },

    sortByLocation: async (req, res) => {
        const { error } = validate.sortByLocation(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        const location = _.pick(req.body, ['country', 'state']);

        if(req.body.state){
            const events = await dbQueries.fetchEventsByLocationWithState(location);
            if(events.length == 0) return responseMessage.notFound('No events found.', res);
            return responseMessage.success('Listing all events happening on the selected location', events, res);
        }

        const events = await dbQueries.fetchEventsByLocation(location);
        if(events.length == 0) return responseMessage.notFound('No events found.', res);
        return responseMessage.success('Listing all events happening on the selected location', events, res);
    },
};

module.exports = event;