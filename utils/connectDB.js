import mongoose from 'mongoose';

export default async function dbConnect() {
    if (mongoose.connections[0].readyState) {
        // console.log('Already connected to mongo');
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
