import mongoose from 'mongoose';

export default async function dbConnect() {
    const db =
        'mongodb+srv://sergey:TyphooNN91!@cluster0.8rtgv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    if (mongoose.connections[0].readyState) {
        console.log('Already connected to mongo');
        return;
    }
    await mongoose.connect(db, {
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
