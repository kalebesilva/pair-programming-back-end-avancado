const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req,res)=>{
	
    const file = (req.url === '/') ? 'index.html' : req.url
    const pathFile = path.join(__dirname,'public',file)

    const extname = path.extname(pathFile)
    const allowedFileTypes = ['.html','.css','.js']
    const allowed = allowedFileTypes.find(item => item == extname) 
    if(!allowed) return

   fs.readFile(pathFile , (err,content)=>{
        if(err) throw err

        res.end(content)
    })

    res.writeHead(200, {
        'Access-Control-Allow-Headers': '*'
    })

    if (req.method === 'POST') {
        let Mybody = '';
        req.on('data', chunk => {
            Mybody += chunk.toString();
        });

        req.on('end', () => {
            const data = JSON.parse(Mybody);
            
            fetch('http://localhost:5000', {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(function (data) {
                console.log(data.json());
            });
        });
    }
    
}).listen(5001,()=>{
    console.log('Servidor rodando...')
})