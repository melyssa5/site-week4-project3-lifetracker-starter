/** Error Classes */

class ExpressError extends Error {
    constructor(message, status){
        super()
        this.message = message
        this.status = status
    }
}

/** 400 BAD REQUEST error */

class BadRequestError extends ExpressError{
    constructor(message = "Bad Request"){
        super(message, 400)
    }
}

/** 401 UNAUTHORIZED error*/
class UnauthorizedError extends ExpressError{
    constructor(message="Unauthorized"){
        super(message, 401)
    }
}

module.exports = {
    ExpressError,
    BadRequestError,
    UnauthorizedError
}