class ApiError extends Error{
    constructor(
       statusCode,
       message="Something went wrong",
       errors=[],
       stack="",
    ){
        super(message)
        this.statusCode=statusCode,
        this.message=message,
        this.errors=errors
        if(stack){
            return this.stack=stack
        }else{
            Error.captureStackTrace(this,this. constructor)
        }
    }
}

export {ApiError}