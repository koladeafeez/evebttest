const { Sequelize, event, eventCoupon, eventCouponUser, Attendee } = require("../../../models");
const Op = Sequelize.Op;
const variables = require('../../helpers/parameters');

//create discount token
function createToken(token){
    return eventCoupon.create(token).catch(error => console.log(error.message));
}

function findEvent(id){
    return event.findByPk(id).catch(error => console.log(error.message));
}

//get event host's coupons
function getUserCoupons(userId) {
    return  eventCoupon.findAll({ 
        where : { userId: userId, deletedAt: null }, 
        attributes: variables.eventCouponDetails,
        include: { model: event, attributes: variables.eventDetails }
    }).catch(error => console.log(error.message));
}

//get discount token by token id
function getCouponDetails(couponId){
    return  eventCoupon.findOne({ 
        where : { id: couponId, deletedAt: null }, 
        attributes: variables.eventCouponDetails ,
        include: { 
            model: eventCouponUser,
            include: [
                { model: Attendee, attributes: ['firstName', 'lastName', 'createdAt'] },
                { model: event, attributes: ['id', 'event_title'] }, 
            ]
        }
    }).catch(error => console.log(error.message));
}

//update discount coupon
function updateCoupon(coupon){
    return eventCoupon.update(
        { 
            percentage_discount: coupon.percentage_discount,
            max_no_of_usage: coupon.max_no_of_usage, 
            expires_on: coupon.expires_on 
        },
        { where : { id: coupon.id, deletedAt: null } }
    ).catch(error => console.log(error.message));
}

//delete discount coupon (soft delete)
function deleteCoupon(coupon) {
    return eventCoupon.update(
        { 
            deletedAt: coupon.deletedAt,
            deletedBy: coupon.deletedBy 
        },
        { where : { id: coupon.id, deletedAt: null } }
    ).catch(error => console.log(error.message));
}

//Verify discount coupon
function verifyCoupon(coupon){
    return  eventCoupon.findOne({ 
        where : { 
           coupon: coupon.coupon, 
           eventId: coupon.eventId, 
           number_used: { [Op.lt]: Sequelize.col('max_no_of_usage') },    //number_used less than max_no_of_usage
           expires_on: { [Op.gte]: new Date() },                         //expires on greater than or equal to current date
           deletedAt: null 
        }, 
       attributes: variables.eventCouponDetails 
    }).catch(error => console.log(error.message));
}

module.exports = {
    createToken, findEvent, getUserCoupons, getCouponDetails, updateCoupon, deleteCoupon, verifyCoupon
};