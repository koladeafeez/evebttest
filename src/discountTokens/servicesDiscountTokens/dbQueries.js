const { Sequelize, VendorServicesToken, vendorService } = require("../../../models");
const Op = Sequelize.Op;
const variables = require('../../helpers/parameters');

//create discount token
function createToken(token){
    return VendorServicesToken.create(token).catch(error => console.log(error.message));
}

function findService(id){
    return vendorService.findByPk(id).catch(error => console.log(error.message));
}

//get discount token by token id
function findToken(token){
   return  VendorServicesToken.findOne({ where : { id: token, deleted_at: null }, attributes: variables.tokenDetails }).catch(error => console.log(error.message));
}

//get vendor's tokens
function fetchVendorTokens(vendorId){
    return  VendorServicesToken.findAll({ where : { created_by: vendorId, deleted_at: null }, attributes: variables.tokenDetails }).catch(error => console.log(error.message));
}

//get token details
function fetchToken(tokenId){
    return  VendorServicesToken.findOne({ where : { id: tokenId, deleted_at: null }, attributes: variables.tokenDetails }).catch(error => console.log(error.message));
}

//update discount token
function updateToken(token){
    return VendorServicesToken.update(
        { 
            percentage_discount: token.percentage_discount,
            max_number_of_usage: token.max_number_of_usage, 
            expires_on: token.expires_on 
        },
        { where : { id: token.id, deleted_at: null } }
    ).catch(error => console.log(error.message));
}

//delete discount token (soft delete)
function deleteToken(token) {
    return VendorServicesToken.update(
        { 
            deleted_at: token.deleted_at,
            deleted_by: token.deleted_by 
        },
        { where : { id: token.id, deleted_at: null } }
    ).catch(error => console.log(error.message));
}


module.exports = {
    createToken, findToken, updateToken, deleteToken, fetchVendorTokens, fetchToken, findService
};