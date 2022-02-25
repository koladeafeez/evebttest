//users
const userDetails = [
    'id', 'title', 'firstName', 'middleName', 'lastName', 'gender', 'email', 'phone', 'isEmailVerified',
    'type_of_business', 'business_name', 'createdAt', 'roleId', 'profile_picture', 'document'
];

const userRegDetails = [
    'id', 'title', 'firstName', 'middleName', 'lastName', 'gender', 'email', 'phone', 'password',
    'type_of_business', 'business_name', 'createdAt', 'roleId', 'profile_picture', 'document'
];

const userDetailsMinor = [
    'firstName', 'middleName', 'lastName', 'email', 'phone', 'business_name', 'profile_picture'
];

//vendor services
const serviceDetails = [
    'id', 'vendorServiceCategoryId', 'description', 'experience_level', 'banner_image', 'price', 'approval_status', 'isListed',
    'userId', 'createdAt'
];

//vendor services category details
const servicesCategoryDetails = [
    'id', 'name', 'description', 'createdAt'
];

//vendor services discount token
const tokenDetails = [
    'id', 'VendorServiceId', 'token', 'percentage_discount', 'max_number_of_usage', 'number_used', 'expires_on', 'created_by', 'createdAt'
];

//events
const eventRegDetails = [
    'eventId', 'type_of_event', 'amount_paid', 'eventCategoryId', 'event_title', 'experience_level', 'event_location', 'longitude', 'latitude', 'country',
    'state', 'city', 'zip_code', 'event_banner', 'description', 'event_summary', 'tags', 'starting_date', 'ending_date', 'starting_time',
    'ending_time', 'isRecuringEvent', 'event_recuring_ends', 'event_recuring_frequency', 'expected_no_of_attendees', 'isListed', 'createdAt'
];

const eventDetails = [
    'id', 'type_of_event', 'amount_paid', 'eventCategoryId', 'event_title', 'experience_level', 'event_location', 'longitude', 'latitude', 'country',
    'state', 'city', 'zip_code', 'event_banner', 'description', 'event_summary', 'tags', 'starting_date', 'ending_date', 'starting_time',
    'ending_time', 'isRecuringEvent', 'event_recuring_ends', 'event_recuring_frequency', 'expected_no_of_attendees', 'isApproved',
    'reason_for_disapproval', 'createdAt', 'userId', 'isSoldOut', 'isListed'
];

const eventCategoryDetails = [
    'id', 'name', 'description', 'userId', 'createdAt'
];

const eventVendorDetails = [
    'id', 'eventId', 'vendorServiceId'
];

const eventTicketDetails = [
    'id', 'eventId', 'type_of_ticket', 'description', 'available_slots', 'no_sold', 'amount', 'createdAt'
];

const vendorServicesCategoryDetails = [
    'id', 'name', 'description', 'createdAt'
];

//event discount token
const eventCouponDetails = [
    'id', 'eventId', 'coupon', 'percentage_discount', 'max_no_of_usage', 'number_used', 
    'expires_on', 'userId', 'createdAt'
];

//event discount token
const accountCouponDetails = [
    'id', 'product_type', 'coupon', 'percentage_discount', 'max_no_of_usage', 'number_used', 
    'expires_on', 'userId', 'createdAt'
];

const attendeeDetails = [ 
    'id', 'firstName', 'lastName', 'email', 'phone', 'amount_paid', 'no_of_tickets_bought', 'userId', 'eventId', 'payment_method', 'createdAt'
];

const attendeeTicketDetails = [ 
    'id', 'ticket_ref_no', 'eventTicketId', 'attendeeId', 'eventId', 'isCheckedIn', 'createdAt'
];

const AdminDiscountCouponUserDetails = [
    'id', 'AdminDiscountCouponId', 'userId', 'product_used_on', 'createdAt'
];

const messageDetails = [
    'id', 'firstName', 'lastName', 'phone', 'email','country', 'company', 'message', 'isRead', 'createdAt'
];

module.exports = {
    userDetails, userRegDetails, serviceDetails, servicesCategoryDetails, userDetailsMinor, tokenDetails, eventRegDetails, eventDetails, 
    eventCategoryDetails, eventVendorDetails, eventTicketDetails, vendorServicesCategoryDetails, eventCouponDetails,attendeeDetails, 
    attendeeTicketDetails, accountCouponDetails, AdminDiscountCouponUserDetails, messageDetails
};