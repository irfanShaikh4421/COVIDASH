class GeneralError extends Error{
    constructor(){
        super()
        this.name = 'General Error'
        this.message = 'Some error occured'
        this.status = 500
    }
}

class BadRequest extends Error{
    constructor(message='Request schema is incorrect'){
        super()
        this.name = 'Bad Request'
        this.message = message
        this.status = 400
    }
}

class NotFound extends Error{
    constructor(message="Resource not found"){
        super()
        this.name = 'Not Found'
        this.message = message
        this.status = 404
    }
}

class Unauthorized extends Error{
    constructor(message="Access denied"){
        super()
        this.name = 'Unauthorized'
        this.message = message
        this.status = 403
    }
}

module.exports = {
    wrapErrorHandler :  (fn) => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(next) ,
    GeneralError,
    BadRequest,
    NotFound,
    Unauthorized
}