import Router, { Request, Response } from "express";
import myJsonData from "./urls.json";
import FileSystem from "fs";
import * as path from "path";
import deleteOperation from "./crud-operations/delete";
import insertOperation from "./crud-operations/insert";

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

myRouters.post("/", (req: Request, res: Response)=>{
  const resultStatus = insertOperation.insert(req.body);
  console.log(resultStatus);
  if(resultStatus == true)
    res.status(200).send(`${JSON.stringify(req.body)} foi adicionada com sucesso`);
  else 
    res.status(500).send(`Erro interno ao adicionar registro`); 
})

export default myRouters;
