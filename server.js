var express = require('express')
var app = express()

const routes = require('./API/routes');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));


app.use('/', routes);


app.listen(port, () => {
    console.log(`Escuchando peticiones por el puerto ${port}`);
})