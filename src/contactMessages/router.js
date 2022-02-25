const express = require('express');
const router = express.Router();
const contactService = require('./service');
const auth = require('../middlewares/auth');
const accessControl = require('../middlewares/accessControl');

//create contact message
router.post( '/', contactService.create );

//Fetch all unread contact messages
router.get( '/unread', [ auth, accessControl.isAdminOrCSO ], contactService.getUnreadMessages );

//get single contact  message
router.get( '/:messageId', [ auth, accessControl.isAdminOrCSO ], contactService.getSingleMessage );

//Fetch all contact messages
router.get( '/', [ auth, accessControl.isAdminOrCSO ], contactService.getMessages );

module.exports = router;