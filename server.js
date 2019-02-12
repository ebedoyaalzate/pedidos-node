var express = require('express')
var app = express()

const hbs = require('hbs')
require('./hbs/helpers');

const routes = require('./routes'); //Requerimos el archivo de rutas

const cookieParser = require('cookie-parser'); //Cookies
const cookieSession = require('cookie-session'); //Middleware para las sesiones

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));


//Express HBS engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/parciales');

app.use('/', routes);


//Middlewares
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
})); //Configuracon de las sesiones



app.listen(port, () => {
    console.log(`Escuchando peticiones por el puerto ${port}`);
})