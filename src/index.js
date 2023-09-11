const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./db');
const personRoutes = require('./route/personRoutes');

dotenv.config({ path: './config/.env' });

const startServer = async () => {
    try {
        await connectDB();

        app.use(express.json());

        app.use('/api', personRoutes);

        app.listen(process.env.PORT, () => {
            console.log(`Server is running, you better catch it on PORT ${process.env.PORT}`,
            `http://localhost:${process.env.PORT}`)
        })

    } catch (error) {
        console.error(error);
    }
}

startServer();
