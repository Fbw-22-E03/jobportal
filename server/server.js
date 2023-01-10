import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectToDB } from './util/db_config.js';
import authRouter from './routers/user.router.js';
import jobRouter from './routers/job.router.js';

const app = express();
dotenv.config();

// DB connection
connectToDB();

// Third-Party MWs
app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routers
app.use('/auth', authRouter);
app.use('/jobs', jobRouter);


// Errors
app.use((req, res, next) => {
    const error = new Error(`The route ${req.originalUrl} is not defined for this server! ☠️`);
    error.statusCode = 404;
    error.status = 'Route Not Found!';

    next(error);
});


app.use((err, req, res, next) => {
    if (err) {
        res
            .status(err.statusCode || 500)
            .json({
                status: err.status,
                message: err.message
            })
    }
});



//port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is up on port ${PORT} ✅`));