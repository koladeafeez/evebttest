const express = require('express');
const router = express.Router();
const vendorService = require('./service');
const { upload } = require('../helpers/multer');
const accessControl = require('../middlewares/accessControl');
const auth = require('../middlewares/auth');
const mediaUpload = upload.fields([ { name: 'banner_image', maxCount: 1 } ]);

//Services creation
router.post( '/create',[auth, accessControl.isVendor], mediaUpload,  vendorService.createService );

//get A vendor's services
router.get( '/myServices', [auth, accessControl.isVendor], vendorService.getUserServices );

//fetch all services created on the platform without the deleted ones
router.get('/all', [auth, accessControl.isAdminOrCSO], vendorService.getAllUndeletedServices);

//fetch services awaiting approval
router.get( '/awaitingApproval', [auth, accessControl.isAdminOrCSO], vendorService.getServicesAwaitingApproval );

//get all approved services
router.get( '/', [auth], vendorService.getApprovedServices );

//Get all vendor services categories
router.get( '/categories', auth,  vendorService.getAllServicesCategories );

//get single service
router.get( '/:id', [auth], vendorService.getSingleService );

//Update Service
router.put( '/:id', [auth, accessControl.isVendor], mediaUpload, vendorService.updateService );

//delete service (soft delete)
router.delete( '/delete/:id', [auth, accessControl.isVendor], vendorService.deleteService );

//approve service
router.put( '/approve/:id', [auth, accessControl.isAdminOrCSO], vendorService.approveService );

//disapprove service
router.put( '/disapprove/:id', [auth, accessControl.isAdminOrCSO], vendorService.disapproveService );

module.exports = router;