import Router,{Request, Response} from 'express'
import {ObjectId } from 'mongodb';
import {collections} from '../services/database.service';
import Favorite from '../models/Favorite';
import express from "express";


const favoritesRouter = Router();
favoritesRouter.use(express.json())

favoritesRouter.get("/", async (req: Request, res: Response)=>{
    try {
        const favorites = async ()=>{
           let f = await collections.favorite?.find({}).toArray();
           if(f){
            return f;
           }else{
            return "Erro"
           }
           
        };
        res.status(200).send(favorites);
    } catch {

        res.send(500).send("Erro");
        
    }
})


export default favoritesRouter;