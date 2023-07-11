const endpointsConfig = require("./endpoints.config.ts");
import * as dotenv from "dotenv"

dotenv.config();
const port = endpointsConfig.PORT;
console.log(port);
console.log("DESGRAMA")