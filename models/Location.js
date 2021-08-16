//
//  mongoose Locations module
//

import mongoose from "mongoose";

const { Schema } = mongoose;

const locationSchema = new Schema({
    email: String,
    author: { type: Schema.Types.ObjectId, ref: "user" },
    name: String,
    location: String,
    price: Number,
    description: String,
    comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
    date: { type: Date, default: Date.now },
    images: []
});

const Location =
    mongoose.models["location"] || mongoose.model("location", locationSchema);

export default Location;
