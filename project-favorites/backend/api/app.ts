import * as fs from "fs";
import * as path from "path";
import data from "./urls.json";
import express, { Request, Response } from "express";
import myRouters from "./routers";
import { URL } from "url";

const app = express();

app.use(express.json());

app.use(myRouters);

app.listen(3000, () => {
  console.log("API Running");
});
