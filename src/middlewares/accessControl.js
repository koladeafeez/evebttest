const responseMessage = require('../helpers/responseMessages');
const dbQuery = require('../users/dbQueries');

async function isVendor(req, res, next){
    const user = await dbQuery.findUserById(req.user._id);
    if ( user.roleId !== 121 ) return responseMessage.forbidden('Access denied', res);
    next();
}

async function isEventHost(req, res, next){
    const user = await dbQuery.findUserById(req.user._id);
    if ( user.roleId !== 131 ) return responseMessage.forbidden('Access denied', res);
    next();
}

async function isAdmin(req, res, next){
    const user = await dbQuery.findUserById(req.user._id);
    if ( user.roleId !== 151 ) return responseMessage.forbidden('Access denied', res);
    next();
}

async function isAdminOrCSO(req, res, next){
    const user = await dbQuery.findUserById(req.user._id);
    if ( user.roleId !== 151 && user.roleId !== 141 ) return responseMessage.forbidden('Access denied', res);
    next();
}

module.exports = {
    isVendor, isEventHost, isAdmin, isAdminOrCSO
};