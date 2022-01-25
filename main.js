const express = require('express');
const app = express();
const {Router} = express;
const productos= Router()
const port = 3001 || process.env.port;

const Contenedor = require('./productos.js')
const prods = new Contenedor('./productos.txt')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos',productos)
app.use('/static', express.static('public'))


//desafio 4
//1- Mostrar todos los productos
app.get('/', (req, res) => {
    prods.getAll().then(resp => res.send(resp))
})

//2- Devuelve un producto segun su id
app.get('/:id', (req, res) => {
    prods.getById(req.params.id).then(resp => res.send(resp))
})

//3- Recibe y agrega un producto 
app.post('/', (req, res) => {
    const addedProduct = req.body
    prods.push(addedProduct)
    res.send(prods)
})

//4- Recibe y actualiza un producto 
app.put('/:id', (req, res) => {
    
})

//5- Elimina un producto segun su id
app.delete('/:id', (req, res) => {
    prods.getById(req.params.id).then(resp => res.send(`Se elimino el producto con id: ${req.params.id}`))
    
})

app.listen(port,()=>{
    console.log(`App listening at ${port}`);
});