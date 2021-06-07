import mongoose from 'mongoose';

export default async function dbConnect() {
    if (mongoose.connections[0].readyState) {
        // console.log('Already connected to mongo');
        return;
    }
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });

    mongoose.connection.on('connected', () => {
        console.log('Connected to mongo');
    });
    mongoose.connection.on('error', (error) => {
        console.log('Error connecting to mongo!', error);
    });
}
