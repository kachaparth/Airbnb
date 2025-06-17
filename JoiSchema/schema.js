
const Joi = require("joi")
let listingSchema = Joi.object(
    {
        title: Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().min(10).required(),
        country:Joi.string().required(),
        location:Joi.string().required(),
        image:Joi.string().allow("",null)
        
    }
).required()


let reviewSchema = Joi.object(
    {
        comment: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required(),
       
    }
)

module.exports = {listingSchema , reviewSchema}