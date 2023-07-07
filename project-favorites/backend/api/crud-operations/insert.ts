import  FileSystem  from 'fs';
import  path  from 'path';
import UrlItem from '../class/UrlItem';

const jsonFilePath = path.join(__dirname, "..", "urls.json");
const fileContents = FileSystem.readFileSync(jsonFilePath, "utf8");
const myJsonData = JSON.parse(fileContents);
let savedElements = new Array();

function insert(data: UrlItem ){

    let working = true;
  console.log(jsonFilePath);
  try {
    FileSystem.writeFile(jsonFilePath, getAddRegister(data), (err) => {
      if (err) {
        throw new Error("err: " + err);
      }
    });

    return working;
  } catch (err) {
    throw err;
  }
}

function getAddRegister(data: UrlItem): string {
    
    myJsonData.forEach((element: UrlItem) => {
        savedElements.push(element);
    });
    savedElements.push(data);
  
    console.log(savedElements);
    return JSON.stringify(savedElements, null, 2);
  }

export default {
    insert: insert
}