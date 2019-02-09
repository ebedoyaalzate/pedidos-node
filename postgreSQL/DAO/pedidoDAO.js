var conection = require('../conection').conection


var insertarPedido = (cantidad, fecha, hora, idProducto, idCliente) => {
    conection.connect()
    conection.query('INSERT INTO public.pedido(cantidad, fecha, hora, id_producto, id_cliente) VALUES ($1,$2,$3,$4,$5);', [cantidad, fecha, hora, idProducto, idCliente])
        .then(response => {
            console.log(response.rows)
            conection.end()
        })
        .catch(err => {
            console.log(err);
            conection.end()
        })
}

var obtenerPedidoID = (id) => {
    conection.connect()
    conection.query('SELECT * from public.pedido where id=$1;', [id])
        .then(response => {
            console.log(response.rows)
            conection.end()
        })
        .catch(err => {
            console.log(err);
            conection.end()
        })
}


var eliminarPedido = (id) => {
    conection.connect()
    conection.query('DELETE from public.pedido where ID=$1;', [id])
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
    insertarPedido,
    obtenerPedidoID,
    eliminarPedido
}