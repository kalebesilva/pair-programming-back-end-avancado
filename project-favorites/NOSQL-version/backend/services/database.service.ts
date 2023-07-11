import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import path from 'path';

export const collections: { favorites?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    dotenv.config();
    console.log(process.env.DB_CONN_STRING)
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const favoriteCollection: mongoDB.Collection = db.collection(process.env.FAVORITES_COLLECTION_NAME);
 
  collections.favorites = favoriteCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${favoriteCollection.collectionName}`);
 }