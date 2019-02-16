const conection = require('../conection')


var insertarPedido = async(cantidad, fecha, hora, idProducto, idCliente) => {
    try {
        console.log("JHGF");
        console.log(cantidad, fecha, hora, idProducto, idCliente);
        var result = await conection.query('INSERT INTO public.pedido(cantidad, fecha, hora, id_cliente, id_producto) VALUES ($1, $2, $3, $4, $5);', [cantidad, fecha, hora, idCliente, idProducto])
        console.log("Jbv");
        return { error: false, mensaje: 'Se inserto correctamente', resultado: result.rows }
    } catch (err) {
        console.log(err);
        return { error: true, mensaje: 'No se inserto correctamente' }
    }
}

var obtenerPedidoCliente = async(idCliente) => {
    try {
        var result = await conection.query('SELECT * from public.pedido where id_cliente=$1;', [idCliente])
        return { error: false, mensaje: 'Se obtuvo correctamente', resultado: result.rows }
    } catch {
        return { error: true, mensaje: 'No existe pedidos con ese cliente' }
    }
}

var eliminarPedido = async(id) => {
    try {
        var result = await conection.query('DELETE from public.pedido where ID=$1;', [id])
        return { error: false, mensaje: 'Se elimino correctamente', resultado: result.rows }
    } catch {
        return { error: true, mensaje: 'No se elimino correctamente' }
    }
}

module.exports = {
    insertarPedido,
    obtenerPedidoCliente,
    eliminarPedido
}