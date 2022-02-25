const _ = require('lodash');
const dbQueries = require('./dbQueries');
const validate = require('./validation');
const responseMessage = require('../../helpers/responseMessages');
const variables = require('../../helpers/parameters');
const { generateDiscountToken } = require('../../helpers/utilities');

const discountToken = {
    //create service discount token
    create: async (req, res) => {
        let tokenDetails = req.body;
        const { error } = validate.createToken(tokenDetails);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        const service = await dbQueries.findService(req.body.VendorServiceId);
        if(!service) return responseMessage.badRequest( "This Service does not exist.", res );
        if(service.userId !== req.user._id) return responseMessage.unauthorized( "You don't have permission to create a discount token for this service", res );

        tokenDetails.created_by = req.user._id;
        tokenDetails.token = generateDiscountToken();
        tokenDetails = await dbQueries.createToken(tokenDetails);

        tokenDetails = _.pick(tokenDetails, variables.tokenDetails);
        return responseMessage.success('Token has been created', tokenDetails, res);
    },

    //get tokens created by the current logged in vendor
    getUserTokens: async (req, res) => {
        let tokens = await dbQueries.fetchVendorTokens(req.user._id);        
        if(!tokens) return responseMessage.notFound('You have not listed any tokens yet', res);

        return responseMessage.success("Listing all the tokens created by the current logged in Vendor", tokens, res);
    },

    //get token details
    tokenDetails: async (req, res) => {
        let token = await dbQueries.fetchToken(req.params.id);        
        if(!token) return responseMessage.notFound('Token not found', res);
        if(token.created_by !== req.user._id) return responseMessage.forbidden('You are not allowed to view this resource', res);

        token = _.pick(token, variables.tokenDetails);
        return responseMessage.success("Listing token details", token, res);
    },

    //update token (token creator only)
    updateToken: async (req, res) => {
        const { error } = validate.createToken(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        let tokenDetails = await dbQueries.findToken(req.params.id); 
        if(!tokenDetails) return responseMessage.notFound('The requested token does not exist.', res);
        if(tokenDetails.created_by !== req.user._id) return responseMessage.forbidden('You are not allowed to edit this token', res);
        let somethingChanged = false;

        if(tokenDetails.percentage_discount !== req.body.percentage_discount){
            tokenDetails.percentage_discount = req.body.percentage_discount;
            somethingChanged = true;
        }
        if(tokenDetails.max_number_of_usage !== req.body.max_number_of_usage){
            tokenDetails.max_number_of_usage = req.body.max_number_of_usage;
            somethingChanged = true;
        }
        if(tokenDetails.expires_on !== req.body.expires_on){
            tokenDetails.expires_on = req.body.expires_on;
            somethingChanged = true;
        }
        if(somethingChanged){
            await dbQueries.updateToken(tokenDetails);
            return responseMessage.success("Token Updated successfully!", tokenDetails, res);
        }

        return responseMessage.success("Nothing to update", tokenDetails, res);
    },

    //delete token (token creator only)
    deleteToken: async (req, res) => {
        let token = await dbQueries.fetchToken(req.params.id);     
        if(!token) return responseMessage.notFound('Token not found', res);
        if(token.created_by !== req.user._id) return responseMessage.forbidden('You are not allowed to delete this resource', res);

        token.deleted_at = new Date();
        token.deleted_by = req.user._id;

        await dbQueries.deleteToken(token);
        token = null;

        return responseMessage.success("token has been deleted successfully!", token, res);
    }
};

module.exports = discountToken;