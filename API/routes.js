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
            req.session._id = result.cliente.id
            res.send({
                ok: true,
                mensaje: result.mensaje,
                login: true,
                cliente: result.cliente
            })
        }
    }
})

router.post('/logout', async(req, res) => {
    req.session._id = undefined
    res.send({
        ok: true,
        mensaje: "El usuario salio de la sesion"
    })
})

router.post('/register', async(req, res) => {
    var resp = await client.crearCliente(req.body)
    if (resp.ok) res.send(resp)
    else res.status(400).json(resp)
})

router.post('/actualizarCliente', async(req, res) => {
    if (req.session._id != undefined) {
        var resp = await client.actualizarCliente(req.body)
        if (resp.ok) res.send(resp)
        else res.status(400).json(resp)
    } else {
        res.status(401).json({
            ok: false,
            mensaje: 'Tiene que estar autenticado'
        })
    }
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
    if (req.session._id != undefined) {
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
    } else {
        res.status(401).json({
            ok: false,
            mensaje: 'Tiene que estar autenticado'
        })
    }
})

router.post('/compra', async(req, res) => {
    if (req.session._id != undefined) {
        var resp = await order.compra(req.body);
        if (resp.ok) {
            res.send({
                ok: resp.ok,
                mensaje: resp.mensaje,
                productos: req.body.productos
            })
        } else {
            res.status(400).json(resp)
        }
    } else {
        res.status(401).json({
            ok: false,
            mensaje: 'Tiene que estar autenticado'
        })
    }
})

router.get('/misPedidos/:id', async(req, res) => {
    if (req.session._id != undefined) {
        var resp = await order.pedidosCliente(req.params.id)
        if (resp.ok) {
            res.send({ pedidos: resp.pedidos })
        } else {
            res.status(400).json(resp)
        }
    } else {
        res.status(401).json({
            ok: false,
            mensaje: 'Tiene que estar autenticado'
        })
    }

})

router.get('/misProductos/:id', async(req, res) => {
    if (req.session._id != undefined) {
        var resp = await order.pedidosProducto(req.params.id)
        if (resp.ok) {
            res.send({ pedidos: resp.productos })
        } else {
            res.status(400).json(resp)
        }
    } else {
        res.status(401).json({
            ok: false,
            mensaje: 'Tiene que estar autenticado'
        })
    }
})




module.exports = router;