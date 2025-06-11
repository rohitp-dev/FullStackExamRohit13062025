import express from 'express';
import dotenv from 'dotenv';
import { connectMongoDB } from './config/dbMongo.js';
import { connectMySQL } from './config/dbMySql.js';
import './models/sql/User.js';

dotenv.config();

const app = express();
app.use(express.json());

connectMongoDB();
connectMySQL();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
