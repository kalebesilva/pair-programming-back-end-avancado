const http = require('http');
const URL = require("url")
const fs = require('fs');
const path = require("path");
const data = require( "./url.json");

 http.createServer((req, res)=>{

     
     const {name, url, del} = URL.parse(req.url, true).query;
     
     if(!name || !url){
        return res.end(JSON.stringify(data));
    }
    if(del){
        data.urls = data.urls.filter(item => item.url != url);
        return res.end('Apagado ' + data.urls)
    }

    return fs.writeFile(
        path.join(__dirname, 'urls.json'),
        JSON.stringify(data, null, 2),
        err => {
            if(err) throw err
            res.end('Operação realizada com sucesso! ' + JSON.stringify(data))
        }
    )
   
 }).listen(5000, ()=> {
     console.log("Api rodando ");
    
 });



