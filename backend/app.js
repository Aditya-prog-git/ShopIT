import express from 'express';
import dotenv from 'dotenv';

//load env variables first
dotenv.config({ path: 'backend/config/.env' });

import { connectDatabase } from './config/dbConnect.js';
import productRoutes from './routes/products.js';
import errroMiddleware from './middlewares/errors.js';
import userRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import orderRoutes from './routes/order.js';
import paymentRoutes from './routes/payment.js';

//handle uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Uncaught Exception');
    process.exit(1);
});

const app = express();

//connecting to database
connectDatabase();

//json parser
app.use(express.json({ limit: '10mb', verify:(req, res, buf)=> {req.rawBody=buf.toString()} }));
//cookies parser
app.use(cookieParser());

//routes
app.use('/api/v1', productRoutes);
//auth routes
app.use('/api/v1', userRoutes);
//order routes
app.use('/api/v1', orderRoutes);
//payment routes
app.use('/api/v1', paymentRoutes);

//using error middleware
app.use(errroMiddleware);

//listening to port
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
}); 

//Handle Unhandled Promise Rejections
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    server.close(() => {
        process.exit(1);
    });
});