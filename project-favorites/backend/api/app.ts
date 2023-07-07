import express, {Request, Response} from "express"
import {URL} from "url";
import * as fs from "fs";
import * as path from "path";
import data from "./urls.json";
import myRouters from "./routers"

const app = express();

app.use(express.json())

app.use(myRouters);

app.listen(3000, ()=>{
    console.log("API Running");
})
