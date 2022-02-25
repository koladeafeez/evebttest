const express = require('express');
const router = express.Router();
const eventService = require('./service');
const { upload } = require('../helpers/multer');
const auth = require('../middlewares/auth');
const accessControl = require('../middlewares/accessControl');
const mediaUpload = upload.fields([ { name: 'event_banner', maxCount: 1 } ]);

//Upload Event banner
router.post( '/', [auth, accessControl.isEventHost], mediaUpload, eventService.uploadEventBanner );

//Create Event
router.put( '/', [auth, accessControl.isEventHost], eventService.create );

//Update Event
router.put( '/:id', [auth, accessControl.isEventHost], eventService.update );

//get all undeleted events on the platform
router.get( '/all', [auth, accessControl.isAdminOrCSO], eventService.getAllUndeletedEvents );

//get all approved events
router.get( '/', eventService.getApprovedEvents );

//get a user's approved events
router.get( '/me/approved', [auth, accessControl.isEventHost], eventService.getUserApprovedEvents ); 

//get a user's disapproved events
router.get( '/me/disapproved', [auth, accessControl.isEventHost], eventService.getUserDisapprovedEvents ); 

//get a user's unlisted events
router.get( '/me/unlisted', [auth, accessControl.isEventHost], eventService.getUserUnlistedEvents ); 

//get a user's events awaiting approval
router.get( '/me/pending', [auth, accessControl.isEventHost], eventService.getUserAwaitingApprovalEvents ); 

//get all events awaiting approval (CSOs and Admins only)
router.get( '/pending', [auth, accessControl.isAdminOrCSO], eventService.getEventsAwaitingApproval ); 

//fetch event categories
router.get( '/categories', eventService.fetchAllEventCategories );

//fetch events by category
router.get( '/categories/:id', eventService.fetchEventByCategoryId );

//fetch events between two dates
router.post( '/sortByDate', eventService.sortByDate );

//fetch events by date
router.get( '/sortByDate/:date', eventService.sortByDate );

//fetch events by event type
router.get( '/type/:eventType', eventService.sortByEventType );

//fetch events by event type
router.post( '/sort/location', eventService.sortByLocation );

//fetch single event details
router.get( '/:id', eventService.fetchEventDetails );

//Approve event
router.put( '/approve/:id', [auth, accessControl.isAdminOrCSO], eventService.approveEvent );

//Disapprove event
router.put( '/disapprove/:id', [auth, accessControl.isAdminOrCSO], eventService.disapproveEvent );

//Stop ticket sales
router.put( '/stopTicketSales/:id', [auth, accessControl.isEventHost], eventService.stopEventTicketSales );

//resume ticket sales
router.put( '/resumeTicketSales/:id', [auth, accessControl.isEventHost], eventService.resumeEventTicketSales );

//delete event
router.delete( '/:id', [auth, accessControl.isEventHost], eventService.deleteEvent );


module.exports = router;