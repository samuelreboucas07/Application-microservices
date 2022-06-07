import mongoose from 'mongoose';
require('dotenv').config();

const { DATABASE_URL, DATABASE_NAME } = process.env;

if (DATABASE_URL && DATABASE_NAME) {
    mongoose.connect(`${DATABASE_URL}/${DATABASE_NAME}`);

    let database: mongoose.Connection = mongoose.connection;

    database.once('open', () => {
        console.log(`Connected to database ${DATABASE_NAME}`);
    });

    database.on('error', () => {
        console.log(`Error connecting to database ${DATABASE_NAME}`);
    });

    mongoose.Promise = global.Promise;
}

export default mongoose;
