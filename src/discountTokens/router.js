const express = require('express');
const router = express.Router();
const servicesTokens = require('./servicesDiscountTokens/service');
const eventCoupons = require('./eventsDiscountTokens/service');
const accountCoupons = require('./adminDiscountTokens/service');
const accessControl = require('../middlewares/accessControl');
const auth = require('../middlewares/auth');

/* Vendors Services Discount tokens (crreated by vendors)
========================================================= */
//Create services discount token
router.post( '/services/create',[auth, accessControl.isVendor],  servicesTokens.create );

//get A vendor's tokens
router.get( '/services/myTokens', [auth, accessControl.isVendor], servicesTokens.getUserTokens );

//get single token details
router.get( '/services/:id', [auth], servicesTokens.tokenDetails );

//Update Service discount token
router.put( '/services/:id', [auth, accessControl.isVendor], servicesTokens.updateToken );

//delete service (soft delete)
router.delete( '/services/:id', [auth, accessControl.isVendor], servicesTokens.deleteToken );


/* Events Discount Coupons (Created by event hosts)
===================================================== */
//Create event discount coupon
router.post( '/events',[auth, accessControl.isEventHost],  eventCoupons.create );

//get all discount coupons created by an event host
router.get( '/events', [auth, accessControl.isEventHost], eventCoupons.getUserCoupons );

//get event discount coupon details
router.get( '/events/coupon/:id', [auth, accessControl.isEventHost], eventCoupons.couponDetails ); //add the token usage history with eager loading

//Update discount coupon
router.put( '/events/:id', [auth, accessControl.isEventHost], eventCoupons.updateCoupon);

//delete discount coupon (soft delete)
router.delete( '/events/:id', [auth, accessControl.isEventHost], eventCoupons.deleteCoupon );

//verify an event discount coupon
router.post('/events/verify', eventCoupons.verifyCoupon);


/*   Accounts Discount Coupons (created by Admins)
===================================================== */
//create account discount coupon
router.post('/accounts', [auth, accessControl.isAdmin], accountCoupons.create);

//fetch all account discount coupon
router.get('/accounts', [auth, accessControl.isAdmin], accountCoupons.accountCoupons);

//fetch account discount coupon details
router.get('/accounts/:couponId', [auth, accessControl.isAdmin], accountCoupons.getCouponDetails);

//update account discount coupon
router.put('/accounts/:couponId', [auth, accessControl.isAdmin], accountCoupons.updateCoupon);

//update account discount coupon
router.delete('/accounts/:couponId', [auth, accessControl.isAdmin], accountCoupons.deleteCoupon);

module.exports = router;