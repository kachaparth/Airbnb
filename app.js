const mongoose = require("mongoose")
const express = require("express")
const Listings = require("./models/Listing")
const app = express()
const cors = require("cors")
const ExpressError = require("./ExpressError")
const {listingSchema,reviewSchema} = require("./JoiSchema/schema")
const Review = require("./models/review")
app.use(cors())

app.use(express.json())

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Airbnb")
}

main().then(() => {
    console.log("Database connected successfully!");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

const validateListing = async (req, res, next) => {
    let { error } =  listingSchema.validate(req.body)
    // console.log(result)
    if (error) {
        let messages = error.details.map((e) => e.message).join(", ");
        //    console.log(error)
        console.log(messages)
        throw new ExpressError(true, 480, messages)

    }
    next()
}

const validateReview = async (req, res, next) => {
    let { error } =  reviewSchema.validate(req.body)
    // console.log(result)
    if (error) {
        let messages = error.details.map((e) => e.message).join(", ");
        //    console.log(error)
        console.log(messages)
        throw new ExpressError(true, 480, messages)

    }
    next()
}



app.get("/listings", async (req, res) => {
    let listings = await Listings.find({})
    res.json(listings)
})


app.post("/listings/new", validateListing, async (req, res, next) => {
    let data = await req.body

    let list1 = await new Listings({ ...data })
    // try{

    await list1.save()
    res.json("Created Successfull!")
    // }
    //  catch(e){
    //     next(e)  
    //  }

})

app.put("/listings/:id/edit", validateListing, async (req, res, next) => {

    try {
        const { id } = await req.params
        const { title, image, description, location, country, price } = await req.body
        await Listings.updateOne({ _id: id }, { title, image, description, location, country, price }, { runValidators: true })
        res.json("Updated")
    } catch (error) {

        throw new ExpressError(true, 480, error.message)
    }
})

app.delete("/listings/:id/delete", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Listings.deleteOne({ _id: id });
        // console.log(response);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Error from backend: " + error.message });
    }
});


app.get("/listings/:id", async (req, res) => {
    let { id } = req.params
    let list = await Listings.findById(id).populate("reviews")
    res.json(list)
})
// ??????????????????????????????????????????????????????????????????????????????????????????????????//////////


app.post("/listings/:id/review",validateReview, async (req, res) => {

    let { id } = req.params
    let review1 = new Review(req.body)
    review1.save()

    let list = await Listings.findById(id)
    list.reviews.push(review1)
    list.save()

    res.json({ error: false, message: "succesful" })

})



app.use((err, req, res, next) => {
    console.log("error comes")
    let { statusCode = 480, iserror = true, message = "Something from backend" } = err
    res.status(statusCode).json({ iserror, message, status: statusCode })
})

app.use("/", (req, res) => {
    res.json("Hi I am root ok")
})

app.listen(8080, () => {
    console.log("Server is on...")
})

