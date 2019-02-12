var express = require('express')
var app = express()

//body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//modelo
var product = require('./model/producto')
var client = require('./model/cliente')
var city = require('./model/ciudad')
var order = require('./model/pedido')


const hbs = require('hbs')
require('./hbs/helpers');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));


//Express HBS engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/parciales');



app.get('/', async(req, res) => {
    //var departamentos = await city.listaDepartamentos();
    //res.render('index');
    res.render('home')
})

app.post('/dept', async(req, res) => {
    var ciudades = await city.obtenerCiudadesDep(req.body.dep);
    res.send({
        ciudades
    });
})

app.post('/login', async(req, res) => {
    var message = await client.login(req.body.user, req.body.pass);
    console.log(message)
    if (message.error) {
        res.render('home', { message })
    } else {
        res.render('index', { message })
    }
})

app.get('/home', async(req, res) => {
    var productos = await product.obtenerProductos();
    res.render('home', {
        productos
    });
})

app.post('/home', async(req, res) => {
    var resp = await client.crearCliente(req.body)
    console.log(resp);
    res.render('home')
})

app.post('/register', async(req, res) => {
    var message = await client.crearCliente(req.body)
    console.log(resp);
    res.render('index', { message })
})

app.post('/compra', async(req, res) => {
    var message = await product.comprarProducto(req.body.producto, req.body.cantidad)
    console.log(resp);
    res.render('home', { message })
})

app.get('/listaPedidosCliente', async(req, res) => {
    var pedidos = order.pedidosCliente('1');
    res.send({
        pedidos
    })
})

app.get('/productosDisponibles', async(req, res) => {
    var productos = order.obtenerProductos();
    res.send({
        productos
    })
})

app.get('/pedidosProdcuto', async(req, res) => {
    var productCantidad = order.pedidosProducto();
    res.send({
        productCantidad
    })
})



app.listen(port, () => {
    console.log(`Escuchando peticiones por el puerto ${port}`);
})