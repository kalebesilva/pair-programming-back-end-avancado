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

myRouters.get("/delete/:id", (req: Request, res: Response) => {
  let id = parseFloat(req.params.id);
  
  if(deleteOperation.delete(id)){
        res.send(`(${id} apagado com sucesso ) \n \n ${JSON.stringify(myJsonData)}`);
  }else{
    res.send("Erro ao realizar a remocao do registro");
  }
  
});

export default myRouters;
