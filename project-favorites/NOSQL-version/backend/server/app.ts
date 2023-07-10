import express from 'express';
import * as dotenv from 'dotenv';
import myRoutes from '../routes/routers';
import mongoose from 'mongoose';
import { MongoClient, ServerApi} from 'mongodb';


const app = express();
dotenv.config();
const databaseConnector = process.env.CONNECTOR;
console.log(databaseConnector);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(myRoutes);

mongoose.connect(`${databaseConnector}`).then()

app.listen(3000, ()=>{
    console.log("Backend-NOSQL running!");
})