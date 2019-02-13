const express = require('express');
const router = express.Router();


//body-parser
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())



//modelo
var product = require('./model/producto')
var client = require('./model/cliente')
var city = require('./model/ciudad')
var order = require('./model/pedido')


//Middleware de sesion
const requireUser = async(req, res, next) => { //Middleware para requerir usuario(verifico que el usuario que esta guardado en la sesion existe)
    const _id = req.session._id;
    if (_id) {
        try {

            const user = await client.obtenerClienteID(_id);
            res.locals.user = user;
            next();

        } catch (error) {
            console.log(error);
        }
    } else {
        return res.redirect('/index');
    }
}

router.get('/', async(req, res) => {
    //var departamentos = await city.listaDepartamentos();
    res.render('home');
})

router.post('/dept', async(req, res) => {
    var ciudades = await city.obtenerCiudadesDep(req.body.dep);
    res.send({
        ciudades
    });
})

router.post('/login', async(req, res) => {
    var user = req.body.user;
    var pass = req.body.pass
    var message = await client.login(user, pass);
    console.log(message)
    if (message.error) {
        res.render('index', { message })
    } else {
        console.log(req.session);
        req.session._id = message.cliente.id;
        res.render('home', { message })
    }
})

router.get('/home', requireUser, async(req, res) => {
    var productos = await product.obtenerProductos();
    res.render('home', {
        productos
    });
})

router.post('/home', requireUser, async(req, res) => {
    var resp = await client.crearCliente(req.body)
    console.log(resp);
    res.render('home')
})

router.post('/register', async(req, res) => {
    var message = await client.crearCliente(req.body)
    console.log(resp);
    res.render('index', { message })
})

router.post('/compra', requireUser, async(req, res) => {
    var message = await product.comprarProducto(req.body.producto, req.body.cantidad)
    console.log(resp);
    res.render('home', { message })
})

router.get('/listaPedidosCliente', requireUser, async(req, res) => {
    var pedidos = order.pedidosCliente('1');
    res.send({
        pedidos
    })
})

router.get('/productosDisponibles', requireUser, async(req, res) => {
    var productos = order.obtenerProductos();
    res.send({
        productos
    })
})

router.get('/pedidosProdcuto', requireUser, async(req, res) => {
    var productCantidad = order.pedidosProducto();
    res.send({
        productCantidad
    })
})

module.exports = router;