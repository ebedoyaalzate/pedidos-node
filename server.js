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


const hbs = require('hbs')
require('./hbs/helpers');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));


//Express HBS engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/parciales');



app.get('/', async(req, res) => {
    var departamentos = await city.listaDepartamentos();
    res.render('home', {
        departamentos
    });
})

app.post('/dept', async(req, res) => {
    var ciudades = await city.obtenerCiudadesDep(req.body.dep);
    res.send({
        ciudades
    });
})

app.post('/home', async(req, res) => {
    res.render('about')
})

app.post('/login', async(req, res) => {
    var response = await client.login(req.body.user, req.body.pass);
    console.log(response);
    res.send({
        response
    });
})

app.post('/', async(req, res) => {
    var resp = await client.crearCliente(req.body)
    console.log(resp);
    res.render('home')
})



app.listen(port, () => {
    console.log(`Escuchando peticiones por el puerto ${port}`);
})