const pedidoDAO = require('../postgreSQL/DAO/pedidoDAO')
const product = require('./producto')
const client = require('./cliente')

var agregarPedido = async(pedido, id) => {
    try {
        var compra = await product.comprarProducto(pedido.nombre, pedido.cantidad)
        console.log(compra);
        if (compra.error) {
            return compra
        } else {

            var fecha = fechaActual()
            var hora = horaActual()
            var result = await pedidoDAO.insertarPedido(pedido.cantidad, fecha, hora, compra.id, id)
            return result

        }
    } catch {
        return { ok: true, mensaje: 'Error insertando pedido' }
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

var compra = async(pedido) => {
    var valida = await validarCompra(pedido)
    var productos = pedido.productos
    var compraF = true
    if (valida.ok) {
        for (producto of productos) {
            var compra = await agregarPedido(producto, pedido.id)
            if (compra.error) compraF = false
        }
        if (compraF) return { ok: true, mensaje: "Compra Realizada" }
        else return { ok: true, mensaje: "Error en la compra" }
    } else return valida
}

var validarCompra = async(pedido) => {
    var id = pedido.id
    var existeCli = await client.existeClienteID(id);
    var flagExPr = true
    var cantidaFlag = true
    var cantidadSufFlag = true
    var numeroReg = /^[0-9]+([,][0-9]+)?$/;
    if (existeCli) {
        for (producto of pedido.productos) {
            var existeProd = await product.existeProductoNombre(producto.nombre)
            if (!existeProd) flagExPr = false
        }
        if (flagExPr) {
            for (producto of pedido.productos) {
                if (!numeroReg.test(producto.cantidad)) cantidaFlag = false
            }
            if (cantidaFlag) {
                for (producto of pedido.productos) {
                    var existeCant = await product.existeCantidadSuf(producto.nombre, producto.cantidad)
                    if (!existeCant) cantidadSufFlag = false
                }
                if (cantidadSufFlag) return { ok: true, mensaje: "Los parametros se encuentran bien" }
                else return { ok: false, mensaje: "Para uno o mas productos no se tienen sificiente cantidad" }
            } else return { ok: false, mensaje: "Una o mas cantidades no son numericas " }
        } else return { ok: false, mensaje: "Uno o mas de los productos no existen" }
    } else return { ok: false, mensaje: "El cliente no existe" }
}

var fechaActual = () => {
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth();
    var yyyy = hoy.getFullYear();

    return `${yyyy}/${mm}/${dd}`;
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
    pedidosProducto,
    compra
}