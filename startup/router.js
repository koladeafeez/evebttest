const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('../src/helpers/errorHandler');
const userRouter = require('../src/users/router');
const vendorRouter = require('../src/vendorServices/router');
const discountTokenRouter = require('../src/discountTokens/router');
const eventsRouter = require('../src/events/router');
const ticketsRouter = require('../src/attendeesAndTicketting/router');
const contactMessagesRouter = require('../src/contactMessages/router');

module.exports = function (app) {
    app.use(express.json({ limit:"5mb" }));
    app.use(bodyParser.urlencoded({ limit:"5mb", extended: true }));
    app.use(errorHandler);                        

    app.use('/', express.Router().get("/api/welcome", (req, res) => res.status(200).json({ 
        message: "Hello, welcome to City Events API, haha!" })
    ));
    app.use('/api/users', userRouter);
    app.use('/api/services', vendorRouter);
    app.use('/api/discountTokens', discountTokenRouter);
    app.use('/api/attendees', ticketsRouter);
    app.use('/api/events', eventsRouter);
    app.use('/api/contact', contactMessagesRouter);

    //add Central error handling below
};