const mongoose = require('mongoose');
require('dotenv').config();


module.exports.dbConnect = async() => {
    console.log("sadasfsdfs");
    if (mongoose.connections[0].readyState) {
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log('Mongo connected');
    }catch(error){
        console.log('Mongo connection error', error);

    }
}
