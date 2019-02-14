const conection = require('../conection')


var insertarProducto = async(nombre, cantidad, precio) => {
    try {
        var result = await conection.query('INSERT INTO public.producto( nombre, cantidad,precio) VALUES ($1,$2,$3);', [nombre, cantidad, precio])
        return { error: false, mensaje: 'Se inserto correctamente', resultado: result.rows }
    } catch {
        return { error: true, mensaje: 'No se inserto correctamente' }
    }
}

var obtenerProductoID = async(id) => {
    try {
        var result = await conection.query('SELECT * from public.producto where id=$1;', [id])
        return { error: false, mensaje: 'Se obtuvo correctamente', resultado: result.rows, rows: result.rowCount }
    } catch {
        return { error: true, mensaje: 'No existe producto con ese ID' }
    }
}

var obtenerProductoNombre = async(nombre) => {
    try {
        var result = await conection.query('SELECT * from public.producto where nombre=$1;', [nombre])
        return { error: false, mensaje: 'Se obtuvo correctamente', resultado: result.rows, rows: result.rowCount }
    } catch {
        return { error: true, mensaje: 'No existe producto con ese nombre' }
    }

}

var actualizarProducto = async(nombre, cantidad, precio) => {
    try {
        var result = await conection.query('UPDATE public.producto SET nombre=$1, cantidad=$2,precio=$3 WHERE nombre=$1;', [nombre, cantidad, precio])
        return { error: false, mensaje: 'Se actualizo correctamente', resultado: result.rows }
    } catch (err) {
        return { error: true, mensaje: 'No se actualizo correctamente' }
    }
}

var eliminarProducto = async(id) => {
    try {
        var result = await conection.query('DELETE from public.producto where ID=$1;', [id])
        return { error: false, mensaje: 'Se elimino correctamente', resultado: result.rows }
    } catch {
        return { error: true, mensaje: 'No se elimino correctamente' }
    }
}

var obtenerProductos = async() => {
    try {
        var result = await conection.query('SELECT * from public.producto;')
        return { error: false, mensaje: 'Se obtuvo correctamente', resultado: result.rows }
    } catch {
        return { error: true, mensaje: 'No se elimino correctamente' }
    }
}

module.exports = {
    insertarProducto,
    obtenerProductoID,
    obtenerProductoNombre,
    actualizarProducto,
    eliminarProducto,
    obtenerProductos
}