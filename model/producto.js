const productoDAO = require('../postgreSQL/DAO/productoDAO')

var agregarProducto = async(producto) => {
    var valido = validarProducto(producto)
    if (valido.ok) {
        var result = await productoDAO.obtenerProductoNombre(producto.nombre);
        if (result.rows != 0) {
            console.log(producto.cantidad);
            console.log(result.resultado[0].cantidad);
            var cant = Number(result.resultado[0].cantidad) + Number(producto.cantidad);
            console.log(cant);
            var actualizar = await productoDAO.actualizarProducto(producto.nombre, cant, producto.precio)
            if (actualizar.error) {
                return { ok: false, mensaje: "Error a la hora de actualizar producto", status: 500 }
            } else {
                return { ok: true, mensaje: `Se actualizo correctamente el producto ${producto.nombre}` }
            }
        } else {
            var insertar = await productoDAO.insertarProducto(producto.nombre, producto.cantidad, producto.precio)
            if (insertar.error) {
                return { ok: false, mensaje: "Error a la hora de insertar el producto", status: 500 }
            } else {
                return { ok: true, mensaje: `Se ingreso correctamente el producto ${producto.nombre}` }
            }
        }
    } else return valido
}

var comprarProducto = async(producto, cantidad) => {
    var result = await productoDAO.obtenerProductoNombre(producto);
    var pdt = result.resultado[0]
    if (pdt.cantidad < cantidad) {
        return { error: true, mensaje: 'No se encuentra suficiente cantidad del producto' }
    } else {
        var cant = pdt.cantidad - cantidad;
        await productoDAO.actualizarProducto(pdt.nombre, cant, pdt.precio)
        return { error: false, mensaje: 'Exitoso', id: result.resultado[0].id }
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
    if (result.rowCount < 1) return true
    else return false
}

var existeProductoNombre = async(nombre) => {
    var result = await productoDAO.obtenerProductoNombre(nombre);
    if (result.rows > 0) return true
    else return false
}

var existeCantidadSuf = async(nombre, cantidad) => {
    var result = await productoDAO.obtenerProductoNombre(nombre);
    var pdt = result.resultado[0]
    if (pdt.cantidad < cantidad) {
        return false
    } else {
        return true
    }
}

var validarProducto = (producto) => {
    var numeroReg = /^[0-9]+([,][0-9]+)?$/;
    if (producto.nombre != undefined && producto.cantidad != undefined && producto.precio != undefined) {
        if (producto.nombre.length >= 1) {
            if (numeroReg.test(producto.cantidad)) {
                if (numeroReg.test(producto.precio)) {
                    return { ok: true, mensaje: "Datos validos" }
                } else return { ok: false, mensaje: "El precio no es valido" }
            } else return { ok: false, mensaje: "La cantidad no es valida" }
        } else return { ok: false, mensaje: "Nombre no valido" }
    } else return { ok: false, mensaje: "Faltan parametros" }

}

module.exports = {
    agregarProducto,
    comprarProducto,
    obtenerProductos,
    obtenerProductoNombre,
    existeProductoNombre,
    existeCantidadSuf
}