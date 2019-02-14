const express = require('express');
const router = express.Router();


//body-parser
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


//sessions

var session = require("express-session");

router.use(session({
    secret: '123Asdfgh',
    resave: true,
    saveUninitialized: true
}));


//modelo
var product = require('../model/producto')
var client = require('../model/cliente')
var city = require('../model/ciudad')
var order = require('../model/pedido')


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
        return res.redirect('/');
    }
}

router.get('/', async(req, res) => {
    //var departamentos = await city.listaDepartamentos();
    datos = await datosRequeridos();
    res.render('index', datos);
})

router.get('/departamentos', async(req, res) => {
    var departamentos = await city.listaDepartamentos();
    if (departamentos) {
        res.send({
            departamentos
        });
    } else {
        res.status(500).json({
            ok: false,
            mensaje: "Internal error"
        })
    }
})

router.get('/ciudades/:departamento', async(req, res) => {
    var departamento = req.params.departamento;
    var existe = await city.existeDepartamento(departamento)
    if (existe) {
        var ciudades = await city.obtenerCiudadesDep(departamento);
        if (ciudades) {
            res.send({
                ciudades
            });
        } else {
            res.status(500).json({
                ok: false,
                mensaje: "Internal error"
            })
        }
    } else {
        res.status(400).json({
            ok: false,
            mensaje: "No existe el departamento"
        })
    }
})

router.post('/login', async(req, res) => {
    var user = req.body.user;
    var pass = req.body.pass
    if (pass === undefined || user === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "Error en los parametros",
            login: false
        })
    } else {
        var result = await client.login(user, pass);
        if (result.error) {
            res.send({
                ok: false,
                mensaje: result.mensaje,
                login: false
            })
        } else {
            res.send({
                ok: false,
                mensaje: result.mensaje,
                login: true,
                cliente: result.cliente
            })
        }
    }
})

router.put('/register', async(req, res) => {
    var resp = await client.crearCliente(req.body)
    if (resp.ok) res.send(resp)
    else res.status(400).json(resp)
})

router.put('/ingresarProducto', async(req, res) => {
    var resp = await product.agregarProducto(req.body)
    if (resp.ok) res.send(resp)
    else {
        if (resp.status === 500) {
            res.status(500).json({ ok: resp.ok, mensaje: resp.mensaje })
        } else {
            res.status(400).json({ ok: resp.ok, mensaje: resp.mensaje })
        }
    }
})

router.get('/listaProductos', async(req, res) => {
    var productos = await product.obtenerProductos();
    if (productos) {
        res.send({
            productos
        });
    } else {
        res.status(500).json({
            ok: false,
            mensaje: "Internal error"
        })
    }
})



router.get('/home', requireUser, async(req, res) => {
    var productos = await product.obtenerProductos();
    res.render('home', {
        productos
    });
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

router.get('/logout', (req, res) => {
    req.session._id = undefined
    res.redirect('/')
})

datosRequeridos = async() => {
    var departamentos = await city.listaDepartamentos();

    var productos = null //await product.obtenerProductos();
    var misPedidos = null //await order.pedidosCliente("2") //cambiar id
    var misProductos = null //await order.pedidosProducto("2")


    var data = {
        departamentos,
        productos,
        misPedidos,
        misProductos
    }

    return data
}

module.exports = router;