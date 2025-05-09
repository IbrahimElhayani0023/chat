import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB.js';
import authRouter from './routes/auth.router.js';

dotenv.config();

const port = process.env.PORT || 8000;


const app = express();

// app.use(express.json());
app.use('/api/auth', authRouter);
app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});