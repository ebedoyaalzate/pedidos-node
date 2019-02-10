const conection = require('../conection').conection


var insertarCliente = async(id, nombre, email, telefono, ciudad, codigo, direccion, clave) => {
    try {
        var result = await conection.query('INSERT INTO public.cliente(id, nombre, email, telefono, ciudad, codigo_postal, direccion, clave) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);', [id, nombre, email, telefono, ciudad, codigo, direccion, clave])
        return { error: false, mensaje: 'Se inserto correctamente', resultado: result.rows }
    } catch {
        return { error: true, mensaje: 'No se inserto correctamente' }
    }
}

var obtenerClienteID = async(id) => {
    try {
        var result = await conection.query('SELECT * from public.cliente where id=$1;', [id])
        return { error: false, mensaje: 'Se inserto correctamente', resultado: result.rows }
    } catch {
        return { error: true, mensaje: 'No existe cliente con ese ID' }
    }
}

var obtenerClienteEmail = async(email) => {
    try {
        var result = await conection.query('SELECT * from public.cliente where email=$1;', [email])
        return { error: false, mensaje: 'Se obtuvo correctamente', resultado: result.rows }
    } catch {
        return { error: true, mensaje: 'No se obtuvo correctamente' }
    }
}

var actualizarCliente = async(id, nombre, email, telefono, ciudad, codigo, direccion, clave) => {
    try {
        var result = await conection.query('UPDATE public.cliente SET ID=$1,nombre=$2, email=$3, telefono=$4, ciudad=$5, codigo_postal=$6, direccion=$7, clave=$8 where id=$1;', [id, nombre, email, telefono, ciudad, codigo, direccion, clave])
        return { error: false, mensaje: 'Se actualizo correctamente', resultado: result.rows }
    } catch {
        return { error: true, mensaje: 'No se actualizo correctamente' }
    }
}

var eliminarCliente = async(id) => {
    try {
        var result = await conection.query('DELETE from public.cliente where ID=$1;', [id])
        return { error: false, mensaje: 'Se elimino correctamente', resultado: result.rows }
    } catch {
        return { error: true, mensaje: 'No se elimino correctamente' }
    }
}

var obtenerClientes = async() => {
    try {
        var result = await conection.query('SELECT * from public.cliente;')
        return { error: false, mensaje: 'Se obtuvo correctamente', resultado: result.rows }
    } catch {
        return { error: true, mensaje: 'No se obtuvo correctamente' }
    }
}

module.exports = {
    insertarCliente,
    obtenerClienteID,
    obtenerClienteEmail,
    actualizarCliente,
    eliminarCliente,
    obtenerClientes
}