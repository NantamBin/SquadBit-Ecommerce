const express = require("express");
const app = express();
const PORT = 8080;

//Middleware
app.use((req, res, next) => {
    app.use((req, res, next)=>{
        res.setHeader('Acess-Control-Allow-Origin', 'http://localhost:3000/');
        res.setHeader('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Acess-Control-Allow-Header', 'Content-Type, Authorization');
        next();
    })
});

//Rota
app.get('/api/home', (req, res) => {
    res.json({messagem: "Olá mundo"});
});

app.listen(PORT, () => {
    console.log(`Servidor está rodando na ${PORT}`);
})