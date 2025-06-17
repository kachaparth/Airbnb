class ExpressError extends Error{
      
    constructor(iserror,statusCode,message){
        super()
        this.iserror  = iserror
        this.statusCode = statusCode
        this.message = message
    }
}

module.exports =ExpressError