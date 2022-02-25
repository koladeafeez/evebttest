const _ = require('lodash');
const dbQueries = require('./dbQueries');
const validate = require('./validation');
const responseMessage = require('../helpers/responseMessages');
const helpers = require('../helpers/utilities');
const variables = require('../helpers/parameters');

const message = {
    // create contact message
    create: async (req, res) => {
        const { error } = validate.createMessage(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        const message = _.pick(req.body, variables.messageDetails);
        message.isRead = 0;
        await dbQueries.createMessage(message); 

        return responseMessage.success('Your message has been received. A customer service representative will get in touch with you shortly.', message, res);
    },

    //Get all contact messages
    getMessages: async (req, res) => {
        const messages = await dbQueries.getMessages();
        if(messages.length == 0) return responseMessage.notFound('No messages found', res);

        return responseMessage.success( 'Listing all contact messages', messages, res );
    },
 
    //get single contact  message
    getSingleMessage: async (req, res) => {
        let message = await dbQueries.getSingleMessage(req.params.messageId);  
        if(!message) return responseMessage.notFound( 'Message not found.', res );

        //mark message as read
        message.isRead = 1;
        await dbQueries.markMessageAsRead(message);

        return responseMessage.success( 'showing the details of the selected message.', message, res );
    },

    //get single contact  message
    getUnreadMessages: async (req, res) => {
        const messages = await dbQueries.getUnreadMessages();  
        if(messages.length == 0) return responseMessage.notFound( 'No messages found.', res );

        return responseMessage.success( 'Listing all unread messages', messages, res );
    },

};

module.exports = message;