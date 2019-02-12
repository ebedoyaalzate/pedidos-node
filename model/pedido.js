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

var pedidosProducto = async(id) => {
    var result = await producto.obtenerPedidoCliente(i)
    var productos = await producto.obtenerProductos()
    var productCantidad = []
    productos.forEach(prod => {
        productCantidad.append({
            id: prod.id,
            producto: prod.nombre,
            cantidad: 0
        })
    })
    var pedidos = result.resultado;
    pedidos.forEach(pedido => {
        productCantidad.forEach(prod => {
            if (pedido.id_producto === prod.id) {
                prod.cantidad += pedido.cantidad
            }
        })
    });
    //validar eliminar pedidos con 0 cantidad

    return productCantidad;
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


module.exports = {
    agregarPedido,
    pedidosCliente,
    pedidosProducto
}