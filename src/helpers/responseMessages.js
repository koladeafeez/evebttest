//404 response
function notFound( message, res ){
    return res.status(404).json({ 
        status: 'Not found',
        message: message,
        data:[] 
    });
}

//400 response
function badRequest( message, res ){
    return res.status(400).json({ 
        status: 'Bad request',
        message: message,
        data:[] 
    });
}

//403 response
function forbidden( message, res ){
    return res.status(403).json({ 
        status: 'Forbidden',
        message: message, 
        data:[] 
    });
}

//200 response
function success( message, data, res ){
    return res.status(200).json({ 
        status: 'success',
        message: message, 
        data: data
    });
}

//200 response
function successfulLogin( token, message, data, res ){
    return res.header('Authorization', token).status(200).json({ 
        status: 'success',
        message: message, 
        data: data

    });
}

//206 response
function partialContent(message, data, res) {
    return res.status(206).json({ 
        status: 'Partial content', 
        message: message, 
        data: data 
    });
}

//401 response
function unauthorized(message, res) {
    return res.status(401).json({ 
        status: 'Unauthorized', 
        message: message || "You don't have permission to view this resource.", 
        data: []
    });
}

//500 response
function internalServerError( message, res ){
    return res.status(500).json({ 
        status: 'Internal Server error',
        message: message || 'Something went wrong', 
        data:[] 
    });
}

module.exports = {
    notFound, badRequest, forbidden, success, successfulLogin, partialContent, unauthorized, internalServerError,
};
