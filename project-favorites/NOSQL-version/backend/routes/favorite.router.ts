import Router,{Request, Response} from 'express'
import {ObjectId } from 'mongodb';
import {collections} from '../services/database.service';
import Favorite from '../models/Favorite';
import express from "express";

const favoritesRouter = Router();
favoritesRouter.use(express.json())

favoritesRouter.get("/", async (req: Request, res: Response)=>{
    try {
        const favorites = (await collections.favorites.find({}).toArray()) as Favorite[];
        res.status(200).send(favorites);
    } catch (error) {

        res.send(500).send(error.message);
        
    }
})


export default favoritesRouter;