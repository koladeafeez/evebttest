const { Sequelize, User, Role } = require("../../models");
const Op = Sequelize.Op;
const variables = require('../helpers/parameters');
// const helpers = require('../helpers/utilities');

//get user with the specified email
function findUser(email){
    return  User.findOne({ 
       where : { email: email, deleted_at: null } 
    }).catch(error => console.log(error.message));
}

//get user by id
function getUserProfile(id){
    return User.findOne({
        where: { id: id },
        attributes: variables.userDetails,
        include: { model: Role, attributes: ['name'] }
    }).catch(error => console.log(error.message));
}

//get user with the email verification token provided
function findEmailVerificationToken(token){
    return  User.findOne({ 
        where : { 
            email_verification_token: token, 
            email_verification_token_expires_on:  { [Op.gte]: new Date() },
            deleted_at: null 
        }
    }).catch(error => console.log(error.message));
}

//get user with the password reset token provided
function findPasswordResetToken(token){
    return  User.findOne({ 
        where : { 
            password_reset_token: token, 
            password_reset_token_expires_on: { [Op.gte]: new Date() },
            deleted_at: null 
        }
    }).catch(error => console.log(error.message));
}

//create new user
function createUser(user){
    return User.create(user).catch(error => console.log(error.message));
}

//find user by id provided
function findUserById(id){
    return User.findOne({
        where: { id: id, deleted_at: null },
        attributes: variables.userDetails,
        include: { model: Role, attributes: ['name'] }
    }).catch(error => console.log(error.message));
}

//update user's email verification field
function verifyEmail(user){
    return User.update(
        { 
            isEmailVerified: user.isEmailVerified,
            email_verification_token: user.email_verification_token, 
            email_verification_token_expires_on: user.email_verification_token_expires_on 
        },
        { where : { id: user.id } }
    ).catch(error => console.log(error.message));
}

//update user's email verification token (if he requested another email verification mail)
function updateEmailVerificationToken(user){
    return User.update(
        { 
            email_verification_token: user.email_verification_token, 
            email_verification_token_expires_on: user.email_verification_token_expires_on 
        },
        { where : { id: user.id } }
    ).catch(error => console.log(error.message));
}

//update user's password reset token
function updateUserPasswordResetToken(user){
    return User.update(
        { 
            password_reset_token: user.password_reset_token, 
            password_reset_token_expires_on: user.password_reset_token_expires_on 
        },
        { where : { id: user.id } }
    ).catch(error => console.log(error.message));
}

//reset user's password
function updateUserPassword(user){
    return User.update(
        { 
            password: user.password,
            password_reset_token: user.password_reset_token, 
            password_reset_token_expires_on: user.password_reset_token_expires_on 
        },
        { where : { id: user.id } }
    ).catch(error => console.log(error.message));
}

//get users that registered today
function getUsersRegisteredToday(){
    return User.findAll({
        where: { createdAt: { [Op.gte]: new Date().setHours(0, 0, 0, 0) }, deleted_at: null },  //get all users created today
        attributes: variables.userDetails,
        order: [
            ['createdAt', 'ASC'],
        ],
        include: { model: Role, attributes: ['name'] }
    }).catch(error => console.log(error.message));
}

//get users that registered today
function getAllUsers(){
    return User.findAll({
        attributes: variables.userDetails,
        order: [
            ['createdAt', 'ASC'],
        ],
        include: { model: Role, attributes: ['name'] }
    }).catch(error => console.log(error.message));
}

//get users that registered today
function getAllUserRoles(){
    return Role.findAll({
        attributes: ['id', 'name', 'comment'],
        order: [
            ['createdAt', 'ASC'],
        ],
        include: { model: User, as: 'users', attributes: variables.userDetails }
    }).catch(error => console.log(error.message));
}

function getUsersByRoleId(roleId){
    return User.findAll({
        where: { roleId: roleId, deleted_at: null },  //get all users created today
        attributes: variables.userDetails,
        order: [
            ['createdAt', 'ASC'],
        ],
        include: { model: Role, attributes: ['name'] }
    }).catch(error => console.log(error.message));
}

//update user role
function updateUserRole(user){
    return User.update(
        { roleId: user.roleId },
        { where : { id: user.id } }
    ).catch(error => console.log(error.message));
}

//delete user (soft delete)
function deleteUser(user){
    return User.update(
        { deleted_at: user.deleted_at, deleted_by: user.deleted_by },
        { where : { id: user.id } }
    ).catch(error => console.log(error.message));
}

//reset user's password
function AdminCSOPasswordReset(user){
    return User.update(
        { 
            password: user.password,
            email_verification_token: user.email_verification_token, 
            email_verification_token_expires_on: user.email_verification_token_expires_on 
        },
        { where : { id: user.id } }
    ).catch(error => console.log(error.message));
}

module.exports = {
    findUser, findEmailVerificationToken, createUser, updateEmailVerificationToken, findPasswordResetToken, updateUserPasswordResetToken,
    verifyEmail, findUserById, updateUserPassword, getUserProfile, getUsersRegisteredToday, getAllUsers, getAllUserRoles, getUsersByRoleId,
    updateUserRole, deleteUser, AdminCSOPasswordReset
};