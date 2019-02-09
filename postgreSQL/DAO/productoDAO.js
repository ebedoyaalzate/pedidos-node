var conection = require('../conection').conection


var insertarProducto = (id, nombre, cantidad, precio) => {
    conection.connect()
    conection.query('INSERT INTO public.producto(id, nombre, cantidad,precio) VALUES ($1,$2,$3,$4);', [id, nombre, cantidad, precio])
        .then(response => {
            console.log(response.rows)
            conection.end()
        })
        .catch(err => {
            console.log(err);
            conection.end()
        })
}

var obtenerProducto = (id) => {
    conection.connect()
    conection.query('SELECT * from public.producto where id=$1;', [id])
        .then(response => {
            console.log(response.rows)
            conection.end()
        })
        .catch(err => {
            console.log(err);
            conection.end()
        })
}

var actualizarProducto = (id, nombre, cantidad, precio) => {
    conection.connect()
    conection.query('UPDATE public.producto SET ID=$1,nombre=$2, cantidad=$3,precio=$4;', [id, nombre, cantidad, precio])
        .then(response => {
            console.log(response.rows)
            conection.end()
        })
        .catch(err => {
            console.log(err);
            conection.end()
        })
}

var eliminarProducto = (id) => {
    conection.connect()
    conection.query('DELETE from public.producto where ID=$1;', [id])
        .then(response => {
            console.log(response.rows)
            conection.end()
        })
        .catch(err => {
            console.log(err);
            conection.end()
        })
}

module.exports = {
    insertarProducto,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}