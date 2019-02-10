var express = require('express')
var app = express()

//body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//pruebas
var product = require('./model/producto')
var client = require('./postgreSQL/DAO/productoDAO')
var city = require('./model/ciudad')




const hbs = require('hbs')
    //require('./hbs/helpers');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));


//Express HBS engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/parciales');



app.get('/', function(req, res) {
    res.render('home', {
        nombre: 'Esteban'
    });
})

app.get('/login', function(req, res) {
    res.render('login')
})

app.get('/register', function(req, res) {
    res.render('register');
})

app.post('/exito', (req, res) => {
    res.send(`<h1> ${req.body.email}!</h1>`);
    console.log(req.body);
})

app.listen(port, () => {
    console.log(`Escuchando peticiones por el puerto ${port}`);
})