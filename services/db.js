// const User = require("../models/User");
const Location = require("../models/Location");
// import Location from "../models/Location";
// import Comment from "../models/Comment";
// const Comment = require("../models/Comment");
// import { compare } from "bcrypt";
const bcrypt = require("bcrypt");
// import connectDB from "./connectDB";
const dbConnect = require("./connectDB")

//  check for user existance
// export const checkUserExist = async (email) => {
//     const user = await User.findOne({ email: email }).exec();
//     if (user) {
//         return true;
//     }
//     return false;
// };

// export const findOneUser = async (email) => {
//     await connectDB();
//     const user = await User.findOne({ email: email }).exec();
//     return user;
// };

// export const verifyPassword = async (password, hashedPassword) => {
//     const isValid = await bcrypt.compare(password, hashedPassword);
//     return isValid;
// };

module.exports.getAllLocations = async () => {
    
    
    await dbConnect.dbConnect();
    const res = await Location.find().lean();
    
    var locations = res.map((location) => ({
        id: location._id.toString(),
        name: location.name,
        price: location.price,
        location: location.location,
        description: location.description,
    }));
    return locations;
};

// export const getLocationById = async (id) => {
//     const location = await Location.findOne({ _id: id }).exec();
//     return location;
// };

// export const updateLocationById = async (id, updatedLocation) => {
//     const response = Location.findByIdAndUpdate(id, updatedLocation);
//     return response;
// };


// export const deleteLocationById = async (id) => {
//     const response = await Location.deleteOne({ _id: id });
//     return response;
// };

// export const getCommentsByLocationId = async(id) => { 
       
//     // const commentsObj = await Location.findOne({ _id: id }).populate("comments").exec();
//     // return commentsObj;


//    const comments = await Location.findOne({
//         _id: id
//     }).
//     populate({
//         path: 'comments',
//         model: Comment,
//         populate: {
//             path: 'author',
//         model: User

//         }
//     });


//     return(comments.comments);
   
// }