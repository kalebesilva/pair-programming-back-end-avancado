import express, { Request, Response } from 'express';
import myRouters from './routers';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());

app.use(express.json());

app.use(bodyParser.json())

app.use(myRouters);

app.listen(3000, () => {
  console.log("API Running");
});
