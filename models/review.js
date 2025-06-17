const { string, number } = require("joi")
const mongoose = require("mongoose")
const { min } = require("../JoiSchema/schema")


const reviewSchema = mongoose.Schema({
  comment:String,
  rating:{
    type:Number,
    min:1,
    max:5,

  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
})

const Review = mongoose.model("Review",reviewSchema)
// console.log("hi")
module.exports = Review