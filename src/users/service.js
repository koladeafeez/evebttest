const _ = require('lodash');
const bcrypt = require('bcrypt');
const dbQueries = require('./dbQueries');
const validate = require('./validation');
const responseMessage = require('../helpers/responseMessages');
const variables = require('../helpers/parameters');
const mailService = require('../helpers/mailServices');
const helpers = require('../helpers/utilities');
const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const user = {

    //User profile
    profile: async (req, res) => {
        let user = await dbQueries.getUserProfile(req.user._id);  
        if(user.length == 0) return responseMessage.notFound( 'User not found.', res );

        return responseMessage.success( 'Listing current user details.', user, res );
    },

    //User registration
    registration: async (req, res) => {
        if (req.body.roleId == 111) {  // for ordinary users
            const { error } = validate.userRegistration(req.body);
            if(error) return responseMessage.badRequest( error.details[0].message, res );
        }
        if(req.body.roleId != 111 && req.body.categoryType == 'Institution'){
            const { error } = validate.institutionRegistration(req.body);
            if(!req.files || !req.files.document) return responseMessage.badRequest( 'Profile picture and Document is required.', res );
            if(error) return responseMessage.badRequest( error.details[0].message, res );
        }
        if(req.body.roleId != 111 && req.body.categoryType == 'Individual'){
            const { error } = validate.businessRegistration(req.body);
            if(error) return responseMessage.badRequest( error.details[0].message, res );
        }

        let user = await dbQueries.findUser(req.body.email.toLowerCase());      
        if(user) return responseMessage.badRequest( 'This email already exists.', res );

        if(req.body.roleId != 111 && req.body.roleId != 121 && req.body.roleId != 131) 
            return responseMessage.badRequest( 'Please select a valid role.', res );

        user = _.pick(req.body, variables.userRegDetails);
        user.email = user.email.toLowerCase();  
        const token = helpers.generateToken(user);
        const salt = await bcrypt.genSalt(10);
        
        user.password = await bcrypt.hash(user.password, salt);

        user.email_verification_token = token;        
        user.email_verification_token_expires_on = helpers.getCurrentDate.addDays(1);  //expires in 1 day
        
        if(req.files){
            if(req.files.profile_picture) user.profile_picture = req.files.profile_picture[0].path;
            if(req.files.document) user.document = req.files.document[0].path;
        }

        await dbQueries.createUser(user);        
        mailService.sendVerificationEmail(user);
        user = _.pick(user, variables.userDetails);

        return responseMessage.success('You have been registered!. please check your email for a verification email from us.', user, res);
    },

    //User login
    login: async (req, res) => {
        const { error } = validate.login(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        let user = await dbQueries.findUser(req.body.email.toLowerCase());
        if (!user) return responseMessage.badRequest( 'Invalid email or password', res );

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return responseMessage.badRequest( 'Invalid email or password', res );

        user = _.pick(user, variables.userDetails);
        const token = helpers.generateAuthToken(user);
        if (user.isEmailVerified == true) return responseMessage.successfulLogin( token, 'You have logged in successfully!', user, res );
  
        return responseMessage.partialContent( 'Please verify your email address', user, res );
    },

    //email verification
    emailVerification: async (req, res) => {
        let user = await dbQueries.findEmailVerificationToken(req.params.token);
        if(!user || user.email_verification_token_expires_on < Date.now()) return responseMessage.badRequest('Invalid or expired token', res);
        if(user.isEmailVerified == 1) return responseMessage.badRequest('Your email has already been verified', res);

        user.isEmailVerified = true;
        user.email_verification_token = null;
        user.email_verification_token_expires_on = null;

        await dbQueries.verifyEmail(user);
        const token = helpers.generateAuthToken(user);
        user = _.pick(user, variables.userDetails);

        return responseMessage.successfulLogin( token, 'Your email has been verified successfully!', user, res );
    },

    //regenerate email verification token
    regenerateEmailVerificationToken: async (req, res) => {
        if(!req.body.email || !req.body.email.match(validEmail)) return responseMessage.badRequest( "Please enter a valid email", res );

        let user = await dbQueries.findUser(req.body.email.toLowerCase());      
        if(!user) return responseMessage.badRequest( 'Sorry, this email does not exist in our database', res );
        if(user.isEmailVerified == 1) return responseMessage.badRequest( 'You have already verified your email address', res );
        
        const token = helpers.generateToken(user);
        user.email_verification_token = token;
        user.email_verification_token_expires_on = Date.now() + 86400000;  //expires in 24 hours
        dbQueries.updateEmailVerificationToken(user);

        mailService.sendVerificationEmail(user);
        user = _.pick(user, variables.userDetails);

        return responseMessage.success('A new verification email has been sent to your email inbox. ' + 'Please check your mail and follow the instructions therein to confirm your account', user, res);
    },

    //forgot password
    forgotPassword: async (req, res) => {
        if(!req.body.email || !req.body.email.match(validEmail)) return responseMessage.badRequest( "Please enter a valid email", res );

        let user = await dbQueries.findUser(req.body.email.toLowerCase());    
        if(!user) return responseMessage.badRequest( 'This email does not exist in our records.', res );

        const token = helpers.generateAuthToken(user);
        user.password_reset_token = token;
        user.password_reset_token_expires_on = Date.now() + 3600000;  //expires in 1 hour
        await dbQueries.updateUserPasswordResetToken(user);
        
        // mailer.passwordReset(req, user);
        mailService.sendPasswordResetEmail(user);

        return responseMessage.success( 'An email was sent to the email address provided. Kindly check your email and follow the instructions therein.', null, res );
    },

    //password reset
    resetPassword: async (req, res) => {
        const { error } = validate.password(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        let user = await dbQueries.findPasswordResetToken(req.params.token);
        if(!user || user.email_verification_token_expires_on < Date.now()) return responseMessage.badRequest('Invalid or expired token', res);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        user.password_reset_token = null;
        user.password_reset_token_expires_on = null;

        await dbQueries.updateUserPassword(user);
        const token = helpers.generateAuthToken(user);
        user = _.pick(user, variables.userDetails);

        if (user.isEmailVerified == true) return responseMessage.successfulLogin( token, 'Your password has been changed successfully!', user, res );
        return responseMessage.partialContent( 'Please verify your email address', user, res );
    },

    getUsersRegisteredToday: async (req, res) => {
        const users = await dbQueries.getUsersRegisteredToday();
        if(users.length == 0) return responseMessage.notFound('No user signed up today.', res);

        return responseMessage.success('Listing all users that reqistered today', users, res);
    },

    getAllUsers: async (req, res) => {
        const users = await dbQueries.getAllUsers();
        if(users.length == 0) return responseMessage.notFound('No users found.', res);

        return responseMessage.success('Listing all users.', users, res);
    },

    getAllUserRoles: async (req, res) => {
        const roles = await dbQueries.getAllUserRoles();
        if(roles.length == 0) return responseMessage.notFound('No roles found.', res);

        return responseMessage.success('Listing all user roles.', roles, res);
    },

    getUsersByRoleId: async (req, res) => {
        const users = await dbQueries.getUsersByRoleId(req.params.roleId);
        if(users.length == 0) return responseMessage.notFound('No users found.', res);

        return responseMessage.success('Listing all users with the given role.', users, res);
    },

    //for admin use only.
    createUser: async (req, res) => {
        const { error } = validate.userRegistration(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        let user = await dbQueries.findUser(req.body.email.toLowerCase());      
        if(user) return responseMessage.badRequest( 'This email already exists.', res );

        user = _.pick(req.body, variables.userRegDetails);
        user.email = user.email.toLowerCase();  
        const token = helpers.generateToken(user);
        const salt = await bcrypt.genSalt(10);
        
        user.password = await bcrypt.hash(user.password, salt);
        user.email_verification_token = token;
        user.created_by = req.user._id;
        user.email_verification_token_expires_on = Date.now() + 86400000;  //expires in 24 hours        
        if(req.files && req.files.profile_picture) user.profile_picture = req.files.profile_picture[0].path;

        await dbQueries.createUser(user);        
        mailService.CSOAndAdminOnboardingEmail(user);
        user = _.pick(user, variables.userDetails);

        return responseMessage.success('The user was created successfully!.', user, res);
    },

    //for admin use only.
    updateUserRole: async (req, res) => {
        const { error } = validate.roleUpdate(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        let user = await dbQueries.getUserProfile(req.body.userId);      
        if(!user) return responseMessage.notFound( 'No user found.', res );

        user.roleId = req.body.roleId;
        await dbQueries.updateUserRole(user);        
        mailService.roleChangeEmail(user);

        //get updated user information
        user = await dbQueries.getUserProfile(req.body.userId);
        return responseMessage.success("The user's role was updated successfully!.", user, res);
    },

    //admin use only
    deleteUser: async (req, res) => {
        let user = await dbQueries.getUserProfile(req.params.userId);      
        if(!user) return responseMessage.notFound( 'No user found.', res );

        user.deleted_at = new Date();
        user.deleted_by = req.user._id;
        await dbQueries.deleteUser(user);        
        
        return responseMessage.success("The user was deleted successfully!.", null, res);
    },

    //admin use only
    viewUser: async (req, res) => {
        const user = await dbQueries.getUserProfile(req.params.userId);      
        if(!user) return responseMessage.notFound( 'No user found.', res );        
        
        return responseMessage.success("Showing the details of the selected user", user, res);
    },
    
    //change password on login (admins and CSOs)
    AdminCSOPasswordReset: async (req, res) => {
        const { error } = validate.password(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );

        let user = await dbQueries.findEmailVerificationToken(req.params.token);
        if(!user || user.email_verification_token_expires_on < Date.now()) return responseMessage.badRequest('Invalid or expired token', res);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        user.email_verification_token = null;
        user.email_verification_token_expires_on = null;

        await dbQueries.AdminCSOPasswordReset(user);
        const token = helpers.generateAuthToken(user);
        user = _.pick(user, variables.userDetails);

        return responseMessage.successfulLogin( token, 'Your password has been changed successfully!', user, res );
    },
};

module.exports = user;