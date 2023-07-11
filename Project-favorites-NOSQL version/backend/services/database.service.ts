import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { favorite?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  dotenv.config();
  const dbConnectionString = process.env["DB_CONN_STRING"];
  const dbNameString = process.env["DB_NAME"];
  if (dbConnectionString === undefined) {
    throw new Error("DB_CONN_STRING environment variable is not defined");
  }
  if(dbNameString === undefined){
    throw new Error("DB_NAME environment variable is not defined");
  }
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    dbConnectionString
  );
  const db: mongoDB.Db = client.db(process.env["DB_NAME"]);


  const favoriteCollection: mongoDB.Collection = db.collection(
    dbNameString
  );

  collections.favorite = favoriteCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${favoriteCollection.collectionName}`
  );
}
