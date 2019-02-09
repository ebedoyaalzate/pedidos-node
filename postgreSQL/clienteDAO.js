var conection = require('./conection').conection


var insertCliente = (id, nombre, email, telefono, ciudad, codigo, direccion, clave) => {
    conection.connect()
    conection.query('INSERT INTO public.cliente(id, nombre, email, telefono, ciudad, codigo_postal, direccion, clave) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);', [id, nombre, email, telefono, ciudad, codigo, direccion, clave])
        .then(response => {
            console.log(response.rows)
            conection.end()
        })
        .catch(err => {
            console.log(err);
            conection.end()
        })
}

var obtenerClienteID = (id) => {
    conection.connect()
    conection.query('SELECT * from public.cliente where id=$1;', [id])
        .then(response => {
            console.log(response.rows)
            conection.end()
        })
        .catch(err => {
            console.log(err);
            conection.end()
        })
}

var obtenerClienteEmail = (email) => {
    conection.connect()
    conection.query('SELECT * from public.cliente where email=$1;', [email])
        .then(response => {
            console.log(response.rows)
            conection.end()
        })
        .catch(err => {
            console.log(err);
            conection.end()
        })
}

var ActualizarCliente = (id, nombre, email, telefono, ciudad, codigo, direccion, clave) => {
    conection.connect()
    conection.query('UPDATE public.cliente SET ID=$1,nombre=$2, email=$3, telefono=$4, ciudad=$5, codigo_postal=$6, direccion=$7, clave=$8 where id=$1;', [id, nombre, email, telefono, ciudad, codigo, direccion, clave])
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
    insertCliente,
    obtenerClienteID,
    obtenerClienteEmail
}