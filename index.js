import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT

const server = http.createServer( async(req, res)=>{
    let filepath;
    try{

        if(req.url === '/index.html' || req.url === '/'){
            filepath = path.join(__dirname, 'public', 'index.html')
        } else if(req.url === '/about.html'){
            filepath = path.join(__dirname, 'public', 'about.html')
        } else if (req.url === '/contact.html'){
            filepath = path.join(__dirname, 'public', 'contact.html')
        } else{
            throw new Error("Method Not Found")
        }
        let data = await fs.readFile(filepath)
        res.setHeader('Content-Type', 'text/html');
        res.write(data);
        res.end();
    } catch (err) { 
        res.writeHeader(500, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({'message': 'Server Error'}))
        res.end()
    }

})

server.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}`)
})