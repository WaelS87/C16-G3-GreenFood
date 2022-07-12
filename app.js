const express = require('express');
const app = express();
const path = require('path');
const port = 3030;

app.use(express.static('public'));

app.get('/',(req,res)=> res.sendFile(path.resolve(__dirname,'views','home.html')));
app.get('/login',(req,res)=> res.sendFile(path.resolve(__dirname,'views','login.html')));
app.get('/registrar',(req,res)=> res.sendFile(path.resolve(__dirname,'views','registrar.html')));
app.get('/detalleProducto',(req,res)=> res.sendFile(path.resolve(__dirname,'views','detalleProducto.html')));
app.get('/carrito',(req,res)=> res.sendFile(path.resolve(__dirname,'views','carrito.html')));


app.listen(port,() => console.log('el servidor esta corriendo en http://localhost:'+port));
