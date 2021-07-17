//
//  mongoose Locations module
//

import mongoose from "mongoose";

const { Schema } = mongoose;

const locationSchema = new Schema({
    email: String,
    name: String,
    location: String,
    price: Number,
    description: String,
    date: { type: Date, default: Date.now },
});

const Location =
    mongoose.models["location"] || mongoose.model("location", locationSchema);

export default Location;
