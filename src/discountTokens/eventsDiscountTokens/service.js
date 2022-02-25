const _ = require('lodash');
const dbQueries = require('./dbQueries');
const validate = require('./validation');
const responseMessage = require('../../helpers/responseMessages');
const variables = require('../../helpers/parameters');
const { generateDiscountToken } = require('../../helpers/utilities');

const discountCoupon = {
    //create service discount token
    create: async (req, res) => {
        const { error } = validate.createCoupon(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );
        let tokenDetails =  _.pick(req.body, variables.eventCouponDetails);

        const event = await dbQueries.findEvent(tokenDetails.eventId);
        if(!event) return responseMessage.badRequest( "This event does not exist.", res );
        if(event.userId !== req.user._id) return responseMessage.unauthorized( "You don't have permission to create a discount coupon for this event", res );

        tokenDetails.userId = req.user._id;
        tokenDetails.coupon = generateDiscountToken();
        tokenDetails.number_used = 0;
        tokenDetails = await dbQueries.createToken(tokenDetails);

        tokenDetails = _.pick(tokenDetails, variables.eventCouponDetails);
        return responseMessage.success('A discount Coupon has been created', tokenDetails, res);
    },

    //get tokens created by the current logged in vendor
    getUserCoupons: async (req, res) => {
        const tokens = await dbQueries.getUserCoupons(req.user._id);
        if(!tokens) return responseMessage.notFound('No coupons found', res);

        return responseMessage.success('Listing all discount coupons created by the current user', tokens, res);
    },

    //get token details
    couponDetails: async (req, res) => {
        const token = await dbQueries.getCouponDetails(req.params.id);
        if(!token) return responseMessage.notFound('No token found', res);
        if(token.userId != req.user._id) return responseMessage.unauthorized('Please consult the event owner.', res);

        return responseMessage.success('Showing the details of the requested coupon.', token, res);
    },

    //Verify coupon
    verifyCoupon: async (req, res) => {
        const { error } = validate.verifyCoupon(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        let coupon = _.pick(req.body, ["eventId", "coupon"]);
        coupon = await dbQueries.verifyCoupon(coupon);
        if(!coupon) return responseMessage.badRequest('invalid or expired coupon.', res);

        return responseMessage.success('Showing the details of the requested coupon.', coupon, res);
    },

    //update token (token creator only)
    updateCoupon: async (req, res) => {
        const { error } = validate.createCoupon(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        let coupon = await dbQueries.getCouponDetails(req.params.id); 
        if(!coupon) return responseMessage.notFound('The requested token does not exist.', res);
        if(coupon.userId !== req.user._id) return responseMessage.forbidden('You are not allowed to edit this token', res);
        let somethingChanged = false;

        if(coupon.percentage_discount !== req.body.percentage_discount){
            coupon.percentage_discount = req.body.percentage_discount;
            somethingChanged = true;
        }
        if(coupon.max_no_of_usage !== req.body.max_no_of_usage){
            coupon.max_no_of_usage = req.body.max_no_of_usage;
            somethingChanged = true;
        }
        if(coupon.expires_on !== req.body.expires_on){
            coupon.expires_on = req.body.expires_on;
            somethingChanged = true;
        }
        if(somethingChanged){
            await dbQueries.updateCoupon(coupon);
            return responseMessage.success("Token Updated successfully!", coupon, res);
        }else{
            return responseMessage.success("Nothing to update", coupon, res);
        }
    },

    //delete token (token creator only)
    deleteCoupon: async (req, res) => {
        let coupon = await dbQueries.getCouponDetails(req.params.id);     
        if(!coupon) return responseMessage.notFound('The requested coupon was not found', res);
        if(coupon.userId !== req.user._id) return responseMessage.forbidden('You are not allowed to delete this resource', res);

        coupon.deletedAt = new Date();
        coupon.deletedBy = req.user._id;

        await dbQueries.deleteCoupon(coupon);
        return responseMessage.success("The coupon has been deleted successfully!", null, res);
    }
};

module.exports = discountCoupon;