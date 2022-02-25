const jwt = require('jsonwebtoken');
const responseMessage = require('../helpers/responseMessages');
const dbQueries = require('../users/dbQueries');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async function (req, res, next){
    try{
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(" ")[1];            
        }
        if(!token) return responseMessage.unauthorized('Kindly login to continue', res);

        const decoded = jwt.verify(token, process.env.JWT_SECRET ); 
        if(await dbQueries.getUserProfile(decoded._id) == null) return responseMessage.badRequest('invalid token', res);
        
        req.user = decoded;
        next();

    } catch (ex){ return responseMessage.badRequest('invalid token', res); }
};
