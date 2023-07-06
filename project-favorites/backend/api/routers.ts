import Router, { Request, Response } from "express";
import myJsonData from "./urls.json";
import FileSystem from "fs";
import * as path from "path";
import deleteOperation from "./crud-operations/delete";


const myRouters = Router();

myRouters.get("/", (req: Request, res: Response) => {
  console.log("The main");
  res.send(JSON.stringify(myJsonData));
});

myRouters.delete("/:id", (req: Request, res: Response) => {
  let id = parseFloat(req.params.id);
  const resultStatus = deleteOperation.delete(id);
  console.log(resultStatus);
  if(resultStatus == true)
    res.status(200).send(`${id} foi apagada com sucesso`);
  else 
    res.status(500).send(`Erro interno`); 

  
});

export default myRouters;
