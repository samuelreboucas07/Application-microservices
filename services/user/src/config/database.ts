import mongoose from 'mongoose';

const { DATABASE_URL, DATABASE_NAME } = process.env;

mongoose.connect(`${DATABASE_URL}/${DATABASE_NAME}`);

let database: mongoose.Connection = mongoose.connection;

database.once('open', () => {
    console.log(`Connected to database ${DATABASE_NAME}`);
});

database.on('error', () => {
    console.log(`Error connecting to database ${DATABASE_NAME}`);
});

mongoose.Promise = global.Promise;

export default mongoose;
