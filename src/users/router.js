const express = require('express');
const router = express.Router();
const userService = require('./service');
const { upload } = require('../helpers/multer');
const auth = require('../middlewares/auth');
const accessControl = require('../middlewares/accessControl');
const mediaUpload = upload.fields([{ name: 'profile_picture', maxCount: 1 }, { name: 'document', maxCount: 1 }]);

//User profile
router.get( '/profile', auth, userService.profile );

//User registration
router.post( '/register', mediaUpload,  userService.registration );

//user login
router.post( '/login', userService.login );

//email verification
router.put( '/verifyEmail/:token', userService.emailVerification );

//regenerate email verification token
router.post( '/regenerateEmailVerificationToken', userService.regenerateEmailVerificationToken );

//forgot password
router.post( '/forgotPassword', userService.forgotPassword );

//reset password
router.post( '/resetPassword/:token', userService.resetPassword );

//Get all users that registered today
router.get( '/registeredToday', [auth, accessControl.isAdminOrCSO], userService.getUsersRegisteredToday );

//Get all user roles
router.get( '/roles', [auth, accessControl.isAdmin], userService.getAllUserRoles );

//Get users by role id
router.get( '/:roleId', [auth, accessControl.isAdmin], userService.getUsersByRoleId );

//Get create admin or CSO
router.post( '/admin/createUser',  mediaUpload, [auth, accessControl.isAdmin], userService.createUser );

//Get update user role
router.put( '/admin/updateUserRole', [auth, accessControl.isAdmin], userService.updateUserRole );

//Get delete user (soft delete)
router.put( '/admin/deleteUser/:userId', [auth, accessControl.isAdmin], userService.deleteUser );

//Get User details
router.get( '/admin/viewUser/:userId', [auth, accessControl.isAdminOrCSO], userService.viewUser );

//Admin and CSO password reset on first login
router.put( '/admin/AdminCSOPasswordReset/:token', userService.AdminCSOPasswordReset );

//Get all users
router.get( '/', [auth, accessControl.isAdminOrCSO], userService.getAllUsers );

module.exports = router;