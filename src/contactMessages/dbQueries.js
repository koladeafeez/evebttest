const { Sequelize, ContactMessages } = require("../../models");
const Op = Sequelize.Op;
const variables = require('../helpers/parameters');

//get message by id
function getSingleMessage(id){
    return ContactMessages.findOne({
        where: { id: id },
        attributes: variables.messageDetails,
    }).catch(error => console.log(error.message));
}

//get all messages
function getMessages(){
    return ContactMessages.findAll({ 
        order: [
            ['createdAt', 'DESC'],
        ],
        attributes: variables.messageDetails 
    }).catch(error => console.log(error.message));
}

//get all unread messages
function getUnreadMessages(){
    return ContactMessages.findAll({
        where: { isRead: 0 },
        order: [
            ['createdAt', 'DESC'],
        ],
        attributes: variables.messageDetails,
    }).catch(error => console.log(error.message));
}

//get all unread messages
function markMessageAsRead(message){
    return ContactMessages.update(
        { isRead: 1 },
        { where : { id: message.id } }
    ).catch(error => console.log(error.message));
}

//create new user
function createMessage(message){
    return ContactMessages.create(message).catch(error => console.log(error.message));
}


module.exports = {
    createMessage, getMessages, getSingleMessage, getUnreadMessages, markMessageAsRead
};