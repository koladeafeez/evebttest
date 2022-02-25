const _ = require('lodash');
const dbQueries = require('./dbQueries');
const validate = require('./validation');
const responseMessage = require('../../helpers/responseMessages');
const variables = require('../../helpers/parameters');
const { generateDiscountToken } = require('../../helpers/utilities');

const accountDiscountCoupon = {
    //create account discount coupon
    create: async (req, res) => {
        const { error } = validate.createCoupon(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );
        let coupon =  _.pick(req.body, variables.accountCouponDetails);

        coupon.userId = req.user._id;
        coupon.coupon = generateDiscountToken();
        coupon.number_used = 0;
        coupon = await dbQueries.createToken(coupon);

        return responseMessage.success('A discount Coupon has been created', coupon, res);
    },

    //get all account discount coupons
    accountCoupons: async (req, res) => {
        const tokens = await dbQueries.accountCoupons();
        if(!tokens) return responseMessage.notFound('No coupons found', res);

        return responseMessage.success('Listing all account discount coupons', tokens, res);
    },

    //get token details
    getCouponDetails: async (req, res) => {
        const token = await dbQueries.getCouponDetails(req.params.couponId);
        if(!token) return responseMessage.notFound('No coupons found', res);

        return responseMessage.success('Showing account discount coupon details', token, res);
    },

    //update token (admin only)
    updateCoupon: async (req, res) => {
        const { error } = validate.createCoupon(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        let coupon = await dbQueries.getCouponDetails(req.params.couponId); 
        if(!coupon) return responseMessage.notFound('Coupon not found.', res);

        coupon.percentage_discount = req.body.percentage_discount;
        coupon.max_no_of_usage = req.body.max_no_of_usage;
        coupon.expires_on = req.body.expires_on;
        await dbQueries.updateCoupon(coupon);
            
        return responseMessage.success("Coupon was updated successfully!", coupon, res);
    },

    //delete token (token creator only)
    deleteCoupon: async (req, res) => {
        let coupon = await dbQueries.getCouponDetails(req.params.couponId);     
        if(!coupon) return responseMessage.notFound('Coupon not found', res);

        coupon.deletedAt = new Date();
        coupon.deletedBy = req.user._id;

        await dbQueries.deleteCoupon(coupon);
        return responseMessage.success("The coupon has been deleted successfully!", null, res);
    }

    // //Verify coupon
    // verifyCoupon: async (req, res) => {
    //     const { error } = validate.verifyCoupon(req.body);
    //     if(error) return responseMessage.badRequest( error.details[0].message, res );

    //     let coupon = _.pick(req.body, ["eventId", "coupon"]);
    //     coupon = await dbQueries.verifyCoupon(coupon);
    //     if(!coupon) return responseMessage.badRequest('invalid or expired coupon.', res);

    //     return responseMessage.success('Showing the details of the requested coupon.', coupon, res);
    // },
};

module.exports = accountDiscountCoupon;