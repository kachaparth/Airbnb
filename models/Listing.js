const { ref } = require("joi")
const mongoose = require("mongoose")
const Review = require("./review")

const ListSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true
    },
    description:String,
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set:(v)=> v===""?"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v
    },
    price:{
        type:Number,
        min:10,
    },

    country:String,
    location:String,
    reviews:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Review"
    }
})

const Listing  = mongoose.model("Listing",ListSchema)

module.exports = Listing