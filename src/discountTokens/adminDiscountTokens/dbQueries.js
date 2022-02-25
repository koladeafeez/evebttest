const { Sequelize, User, AdminDiscountCoupon, AdminDiscountCouponUser } = require("../../../models");
const Op = Sequelize.Op;
const variables = require('../../helpers/parameters');

//create discount token
function createToken(token){
    return AdminDiscountCoupon.create(token).catch(error => console.log(error.message));
}

//get all account discount coupons
function accountCoupons() {
    return  AdminDiscountCoupon.findAll({ 
        where : { deletedAt: null }, 
        attributes: variables.accountCouponDetails,
        include:[
            { model: User, attributes: ['firstName', 'lastName', 'business_name'] },
            { model: AdminDiscountCouponUser, attributes: variables.AdminDiscountCouponUserDetails, 
                include: { model: User, attributes: ['firstName', 'lastName', 'business_name'] }
            },
        ]
    }).catch(error => console.log(error.message));
}

//get all account discount coupons
function getCouponDetails(couponId) {
    return  AdminDiscountCoupon.findOne({ 
        where : { id: couponId, deletedAt: null }, 
        attributes: variables.accountCouponDetails,
        include:[
            { model: User, attributes: ['firstName', 'lastName', 'business_name'] },
            { model: AdminDiscountCouponUser, attributes: variables.AdminDiscountCouponUserDetails, 
                include: { model: User, attributes: ['firstName', 'lastName', 'business_name'] }
            },
        ]
    }).catch(error => console.log(error.message));
}

//update discount coupon
function updateCoupon(coupon){
    return AdminDiscountCoupon.update(
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
    return AdminDiscountCoupon.update(
        { 
            deletedAt: coupon.deletedAt,
            deletedBy: coupon.deletedBy 
        },
        { where : { id: coupon.id, deletedAt: null } }
    ).catch(error => console.log(error.message));
}

module.exports = {
    createToken, accountCoupons, getCouponDetails, updateCoupon, deleteCoupon
};