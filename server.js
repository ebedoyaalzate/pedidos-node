var express = require('express')
var app = express()

const hbs = require('hbs')
require('./hbs/helpers');

const routes = require('./routes'); //Requerimos el archivo de rutas

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));


//Express HBS engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/parciales');

app.use('/', routes);


app.listen(port, () => {
    console.log(`Escuchando peticiones por el puerto ${port}`);
})