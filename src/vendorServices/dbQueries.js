const { vendorService, User, vendorServiceCategory } = require("../../models");
const variables = require('../helpers/parameters');

//create service
function createService(service){
    return vendorService.create(service).catch(error => console.log(error.message));
}

//get all services
function fetchAllServices() {
    return vendorService.findAll({ 
        where: { deleted_at: null, isListed: true },
        attributes: variables.serviceDetails, 
        order: [
            ['createdAt', 'ASC'],
        ],
        include: [
            { model: User, attributes: variables.userDetailsMinor },
            { model: vendorServiceCategory, attributes: variables.servicesCategoryDetails }
        ]
    }).catch(error => console.log(error.message));
}

//get a vendor's services
function fetchVendorServices(vendorId) {
    return vendorService.findAll({ 
        where: { userId: vendorId, deleted_at: null }, 
        attributes: variables.serviceDetails, 
        order: [
            ['createdAt', 'ASC'],
        ],
        include:{ model: User, attributes: variables.userDetailsMinor } 
    }).catch(error => console.log(error.message));
}

//get single service details
function fetchSingleService(serviceId) {
    return vendorService.findOne({
        where: { id: serviceId, deleted_at: null }, 
        attributes: variables.serviceDetails, 
        include:{ model: User, attributes: variables.userDetailsMinor } 
    }).catch(error => console.log(error.message));
}

//update a service
function updateService(service){
    return vendorService.update(
        { 
            description: service.description, 
            experience_level: service.experience_level,
            banner_image: service.banner_image,
            price: service.price 
        },
        { where : { id: service.id } }
    ).catch(error => console.log(error.message));
}

//delete service (soft delete)
function deleteService(service) {
    return vendorService.update(
        { 
            deleted_at: service.deleted_at,
            deleted_by: service.deleted_by 
        },
        { where : { id: service.id } }
    ).catch(error => console.log(error.message));
}

//get all vendor services categories
function getAllServicesCategories() {
    return vendorServiceCategory.findAll({ 
        where: { deleted_at: null }, 
        attributes: variables.vendorServicesCategoryDetails,
        order: [
            ['createdAt', 'ASC'],
        ],
    }).catch(error => console.log(error.message));
}

//get all undeleted services
function getAllUndeletedServices(){
    return vendorService.findAll({ 
        where: { deleted_at: null },
        attributes: variables.serviceDetails, 
        order: [
            ['createdAt', 'ASC'],
        ],
        include: [
            { model: User, attributes: variables.userDetailsMinor },
            { model: vendorServiceCategory, attributes: variables.servicesCategoryDetails }
        ]
    }).catch(error => console.log(error.message));
}

//get all undeleted services
function approveOrDisapproveService(service){
    return vendorService.update(
        { 
            approval_status: service.approval_status,
            isListed: service.isListed 
        },
        { where : { id: service.id, deleted_at: null } }
    ).catch(error => console.log(error.message));        
}

//get all services awaiting approval
function getServicesAwaitingApproval(service){
    return vendorService.findAll({ 
        where: { approval_status: 'Awaiting approval' },
        attributes: variables.serviceDetails, 
        include: [
            { model: User, attributes: variables.userDetailsMinor },
            { model: vendorServiceCategory, attributes: variables.servicesCategoryDetails }
        ]
    }).catch(error => console.log(error.message));       
}

module.exports = {
    createService, fetchVendorServices, fetchAllServices, fetchSingleService, updateService, deleteService, getAllServicesCategories,
    getAllUndeletedServices, approveOrDisapproveService, getServicesAwaitingApproval
};