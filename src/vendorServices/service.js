const _ = require('lodash');
const dbQueries = require('./dbQueries');
const validate = require('./validation');
const responseMessage = require('../helpers/responseMessages');

const vendor = {

    //create service
    createService: async (req, res) => {
        let service = req.body;
        const { error } = validate.createService(service);
        if(error) return responseMessage.badRequest( error.details[0].message, res );
        if(!req.files || !req.files.banner_image) return responseMessage.badRequest( "Service picture or banner is required", res );

        service.userId = req.user._id;
        if(req.files && req.files.banner_image) service.banner_image = req.files.banner_image[0].path;
        service = await dbQueries.createService(service);

        return responseMessage.success('Service created', service, res);
    },

    //get a vendors's services
    getUserServices: async (req, res) => {
        let services = await dbQueries.fetchVendorServices(req.user._id);  
        if(!services) return responseMessage.notFound('You have not listed any services yet', res);

        return responseMessage.success("Listing the current Vendor's services", services, res);
    },

    //get all listed vendors's services
    getApprovedServices: async (req, res) => {
        let services = await dbQueries.fetchAllServices();        
        if(!services) return responseMessage.notFound('No services found', res);

        return responseMessage.success("Listing all approved services", services, res);
    },

    //get single service details
    getSingleService: async (req, res) => {
        let services = await dbQueries.fetchSingleService(req.params.id);     
        if(!services) return responseMessage.notFound('No services found', res);

        return responseMessage.success("Service details", services, res);
    },

    //update service (service creator only)
    updateService: async (req, res) => {
        const { error } = validate.createService(req.body);
        if(error) return responseMessage.badRequest( error.details[0].message, res );
        if(!req.files.banner_image) return responseMessage.badRequest( "Service picture or banner is required", res );

        let service = await dbQueries.fetchSingleService(req.params.id);     
        if(!service) return responseMessage.notFound('No service found', res);
        if(service.userId !== req.user._id) return responseMessage.forbidden('You are not allowed to edit this resource', res);
        let somethingChanged = false;

        if(req.files.banner_image){
            service.banner_image = req.files.banner_image[0].path;
            somethingChanged = true;
        } 
        if(service.description !== req.body.description){
            service.description = req.body.description;
            somethingChanged = true;
        }
        if(service.experience_level !== req.body.experience_level){
            service.experience_level = req.body.experience_level;
            somethingChanged = true;
        }
        if(service.price !== req.body.price){
            service.price = req.body.price;
            somethingChanged = true;
        }
        if(somethingChanged){
            await dbQueries.updateService(service);
            return responseMessage.success("Service Updated successfully!", service, res);
        }

        return responseMessage.success("Nothing to update", service, res);
    },

    //delete service (service creator only)
    deleteService: async (req, res) => {
        let service = await dbQueries.fetchSingleService(req.params.id);     
        if(!service) return responseMessage.notFound('No service found', res);
        if(service.userId !== req.user._id) return responseMessage.forbidden('You are not allowed to delete this resource', res);

        service.deleted_at = Date.now();
        service.deleted_by = req.user._id;

        await dbQueries.deleteService(service);
        service = null;

        return responseMessage.success("Service has been deleted successfully!", service, res);
    },

    //Get all vendor services categories
    getAllServicesCategories: async (req, res) => {
        const servicesCategories = await dbQueries.getAllServicesCategories();     
        if(!servicesCategories) return responseMessage.notFound('No categories found', res);

        return responseMessage.success("Listing all approved vendor services categories", servicesCategories, res);
    },

    getAllUndeletedServices: async (req, res) => {
        const services = await dbQueries.getAllUndeletedServices();     
        if(!services) return responseMessage.notFound('No service found', res);

        return responseMessage.success("Listing all undeleted services created on the platform", services, res);
    },

    approveService: async (req,res) => {
        let service = await dbQueries.fetchSingleService(req.params.id);     
        if(!service) return responseMessage.notFound('No services found', res);

        service.approval_status = 'Approved';
        service.isListed = 1;
        // service.approved_by = req.user._id;    add this later
        // service.approvedAt = new Date();    add this later
        await dbQueries.approveOrDisapproveService(service);

        return responseMessage.success("Service was approved successfully!", service, res);
    },

    disapproveService: async (req,res) => {
        let service = await dbQueries.fetchSingleService(req.params.id);     
        if(!service) return responseMessage.notFound('No services found', res);

        service.approval_status = 'Disapproved';
        service.isListed = 0;
        // service.approved_by = req.user._id;    add this later
        // service.approvedAt = new Date();    add this later
        await dbQueries.approveOrDisapproveService(service);

        return responseMessage.success("Service was disapproved successfully!", service, res);
    },

    getServicesAwaitingApproval: async (req, res) =>{
        const services = await dbQueries.getServicesAwaitingApproval();     
        if(!services) return responseMessage.notFound('No services found', res);

        return responseMessage.success("Listing services awaiting approval", services, res);
    }
};


module.exports = vendor;