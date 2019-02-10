const productoDAO = require('../postgreSQL/DAO/productoDAO')

var agregarProducto = async(producto) => {
    var existeProductoN = await existeProductoNombre(producto.nombre)
    if (existeProductoN) {
        var result = await productoDAO.obtenerProductoNombre(nombre);
        var cant = result.cantidad + producto.cantidad;
        await productoDAO.actualizarProducto(producto.nombre, cant, producto.precio)
    } else {
        await productoDAO.insertarProducto(producto.nombre, producto.cantidad, producto.precio)
    }
}

var comprarProducto = async(producto, cantidad) => {
    var result = await productoDAO.obtenerProductoNombre(producto);
    var pdt = result.resultado[0]
    if (pdt.cantidad < cantidad) {
        return { error: true, mensaje: 'No se encuentra suficiente cantidad' }
    } else {
        var cant = pdt.cantidad - cantidad;
        await productoDAO.actualizarProducto(pdt.nombre, cant, pdt.precio)
        return { error: false, mensaje: 'Exitoso' }
    }

}

var obtenerProductoNombre = async(nombre) => {
    var result = await clienteDAO.obtenerProductoNombre(nombre)
    if (result.resultado[0]) return result.resultado[0]
    else return {
        error: true,
        mensaje: 'No se encontro producto'
    }
}

var obtenerProductos = async() => {
    var result = await productoDAO.obtenerProductos()
    return result.resultado
}

var existeProductoID = async(id) => {
    var result = await productoDAO.obtenerProductoID(id);
    if (result.resultado[0]) return true
    else return false
}

var existeProductoNombre = async(nombre) => {
    var result = await productoDAO.obtenerProductoNombre(nombre);
    if (result.resultado[0]) return true
    else return false
}

module.exports = {
    agregarProducto,
    comprarProducto,
    obtenerProductos,
    obtenerProductoNombre
}