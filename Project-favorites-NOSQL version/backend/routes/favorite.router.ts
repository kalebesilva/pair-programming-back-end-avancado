import Router,{Request, Response} from 'express'
import {ObjectId } from 'mongodb';
import {collections} from '../services/database.service';
import Favorite from '../models/Favorite';
import express from "express";


const favoritesRouter = Router();

favoritesRouter.use(express.json())


// GET ALL
favoritesRouter.get("/", async (req: Request, res: Response)=>{
    try {
        const favorites = await collections.favorite?.find({}).toArray()
        res.status(200).send(favorites);
    } catch(error) {

        res.send(500).json({mensage: `${error}`});
        
    }
});

// GET BY ID
favoritesRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.["id"];

    try {
        
        const query = { _id: new ObjectId(id) };
        const favorite = (await collections.favorite?.findOne(query));

        if (favorite) {
            res.status(200).send(favorite);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params?.["id"]}`);
    }
});


// INSERT
favoritesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newFavorite = req.body as Favorite;
        const result = await collections.favorite?.insertOne(newFavorite);

        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error) {
        console.error(error);
        res.status(400).json({mensage: `${error}`});
    }
});

// UPDATE
favoritesRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.['id'];

    try {
        const updateFavorite: Favorite = req.body as Favorite;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.favorite?.updateOne(query, { $set: updateFavorite });

        result
            ? res.status(200).send(`Successfully updated game with id ${id}`)
            : res.status(304).send(`Game with id: ${id} not updated`);
    } catch (error: any) {
        console.error(`${error.message}`);
        res.status(400).send(error.message);
    }
});


// DELETE
favoritesRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.["id"];

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.favorite?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed game with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove game with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
        }
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

export default favoritesRouter;