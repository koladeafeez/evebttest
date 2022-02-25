const jwt = require('jsonwebtoken');
const Chance = require('chance');
const chance = new Chance();

require('dotenv').config();

function generateAuthToken(user) {
    const token = jwt.sign({_id: user.id, role: user.role}, process.env.JWT_SECRET);
    return token;
}

function generateToken(user) {
    const token = jwt.sign({email: user.email}, process.env.JWT_SECRET);
    return token;
}

function generateDiscountToken() {
    return chance.string({ length: 10, casing: 'upper', alpha: true, numeric: true });
}

function generateTicketRefNo() {
    return chance.string({ length: 10, casing: 'upper', alpha: true, numeric: true });
}

//date manipulation
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};
let getCurrentDate = new Date();

module.exports = {
    generateAuthToken, generateToken, generateDiscountToken, generateTicketRefNo, getCurrentDate
};