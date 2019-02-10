const pedidoDAO = require('../postgreSQL/DAO/pedidoDAO')
const producto = require('./producto')

var agregarPedido = async(pedido) => {
    try {
        var compra = await producto.comprarProducto(pedido.producto, pedido.cantidad)
        if (compra.error) return compra

        var prd = await producto.obtenerProductoNombre(pedido.producto)
        var fecha = fechaActual()
        var hora = horaActual()

        var result = await pedidoDAO.insertarPedido(pedido.cantidad, fecha, hora, prd.id_producto, pedido.idCliente)
        return result
    } catch {
        return { error: true, mensaje: 'Error insertando pedido' }
    }

}

var pedidosCliente = async(id) => {
    var result = await pedidoDAO.obtenerPedidoCliente(id)
    return result.resultado
}


var fechaActual = () => {
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth();
    var yyyy = hoy.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
}

var horaActual = () => {
    var hoy = new Date();
    var hora = hoy.getHours();
    var min = hoy.getMinutes();
    var seg = hoy.getSeconds();

    return `${hora}:${min}:${seg}`;

}