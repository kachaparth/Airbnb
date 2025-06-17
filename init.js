const mongoose = require("mongoose");
const Listing = require("./models/Listing");
const data = require("./init/data").data;
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Airbnb")
}

main().then(() => {
    console.log("Database connected successfully!");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

// console.log(data)

async function intialize() {
    await Listing.deleteMany({});
    Listing.insertMany(data)
.then((res)=>{
    console.log("saved succesfully list1 = " + res)
})
.catch((err)=>{
    console.log(err)
}) 
}

intialize()


