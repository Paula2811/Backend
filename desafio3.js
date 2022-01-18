const express = require('express');
const app = express();
const port = 8080 || process.env.port;

const Contenedor = require('./desafio.js')
const prods = new Contenedor('./productos.txt')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Array de productos
const productos = [
    {
        title: 'Cartuchera',
        price: 1200,
        imgurl: 'https://http2.mlstatic.com/D_NQ_NP_996400-MLA32738055325_112019-O.jpg',
        id: 1
    },
    {
        title: 'Resaltador Stabilo Pastel',
        price: 980,
        imgurl: 'https://http2.mlstatic.com/D_NQ_NP_645415-MLA46333170733_062021-O.jpg',
        id: 2
    },
    {
        title: 'Cuaderno Cherhane A5',
        price: '2300',
        imgurl: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/891/147/products/image0-21-5e2edd3aa8137d541316216162123526-1024-1024.jpeg',
        id: 3
    }
]

app.get('/productos', (req, res) => {
    const productosJs = JSON.stringify(productos)
    res.send(`Productos en el servidor: ${productosJs}`)
})

app.get('/productoRandom', (req, res) => {
    let rand = Math.floor(Math.random()*productos.length);
    let rValue = productos[rand];
    const productosJs = JSON.stringify(rValue)
    res.send(`Produsto elegido al azar: ${productosJs}`)
})

//Con el desafio anterior
app.get('/productostxt', (req, res) => {
    prods.getAll().then(resp => res.send(resp))
})

app.get('/productoRandomtxt', (req, res) => {
    prods.getAll().then(resp => res.send(
        resp[
            Math.floor(Math.random()*resp.length)
        ]
        ))
})

app.listen(port,()=>{
    console.log(`Example app listening at ${port}`);
});