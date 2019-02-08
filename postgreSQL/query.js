var conection = require('./conection').conection


var insertCliente = () => {
    conection.connect()
    conection.query('INSERT INTO public.cliente(id, nombre, email, telefono, ciudad, codigo_postal, direccion, clave) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);', ["12", "Esteban", "Esteban@nhjds", "321", "rionegro", "123", "cll112", "123"])
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
    insertCliente
}