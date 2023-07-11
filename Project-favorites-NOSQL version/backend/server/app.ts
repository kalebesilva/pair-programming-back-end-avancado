import express from "express";
import { connectToDatabase } from "../services/database.service"
import  favoritesRouter  from "../routes/favorite.router";
import * as dotenv from 'dotenv';

dotenv.config()
const app = express();
const port = 3000;

connectToDatabase()
    .then(() => {
        app.use("/favorite", favoritesRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });