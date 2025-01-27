const app = require("./routes/routes")
const http = require('http');
const port = parseInt(process.env.PORT,10) || 8000;
app.set('port',port);

const server = http.createServer(app);
server.listen(port,()=> {
    console.log(`localhost:${port}`);
    
});
module.exports=app;