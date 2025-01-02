import mongoose from 'mongoose';

export const connectDatabase = () => {
    const DB_URI = process.env.NODE_ENV === 'development' ? process.env.DB_LOCAL_URI : process.env.DB_URI;

    mongoose.connect(DB_URI).then((con) => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    }).catch(err => {
        console.error('Database connection error:', err);
    });
};