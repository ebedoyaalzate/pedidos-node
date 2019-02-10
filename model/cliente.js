const clienteDAO = require('../postgreSQL/DAO/clienteDAO')
const city = require('./ciudad')

var crearCliente = async(cliente) => {
    var existeClienteE = await existeClienteEmail(cliente.email);
    var codigoCiudad = await city.obtenerCodigo(cliente.ciudad)
    if (!existeClienteE) {
        var existeClienteI = await existeClienteID(cliente.id);
        if (!existeClienteI) {
            await clienteDAO.insertarCliente(cliente.id, cliente.nombre, cliente.email, cliente.telefono, codigoCiudad, cliente.codigo, cliente.direccion, cliente.clave)
        } else {
            return {
                error: true,
                mensaje: 'El id ya tiene cuenta asociada'
            }
        }
    } else {
        return {
            error: true,
            mensaje: 'El correo ya tiene cuenta asociada'
        }

    }

}

var actualizarCliente = async(cliente) => {
    var existeClienteE = await existeClienteEmail(cliente.email);
    var codigoCiudad = await city.obtenerCodigo(cliente.ciudad)
    if (!existeClienteE) {
        var existeClienteI = await existeClienteID(cliente.id);
        if (!existeClienteI) {
            await clienteDAO.insertarCliente(cliente.id, cliente.nombre, cliente.email, cliente.telefono, codigoCiudad, cliente.codigo, cliente.direccion, cliente.clave)
        } else {
            return {
                error: true,
                mensaje: 'El id ya tiene cuenta asociada'
            }
        }
    } else {
        return {
            error: true,
            mensaje: 'El correo ya tiene cuenta asociada'
        }
    }
}

var login = (user, pass) => {
    var cliente
    if (user.indexOf("@") < 0) {
        cliente = await obtenerClienteID(user)
    } else {
        cliente = await obtenerClienteEmail(email)
    }
    if (cliente.error) return cliente

    if (cliente.id === pass) return { error: false, mensaje: "Exitoso" }
    else return { error: true, mensaje: "Error en la contraseña" }
}

var obtenerClienteEmail = async(email) => {
    var result = await clienteDAO.obtenerClienteEmail(email)
    var ciudad
    if (result.resultado[0]) {
        ciudad = result.resultado[0].ciudad
        result.resultado[0].ciudad = await city.obtenerNombreCiudad(ciudad)
        return result.resultado[0]
    } else return {
        error: true,
        mensaje: 'No se encontro usuario'
    }
}

var obtenerClienteID = async(id) => {
    var result = await clienteDAO.obtenerClienteID(id)
    var ciudad
    if (result.resultado[0]) {
        ciudad = result.resultado[0].ciudad
        result.resultado[0].ciudad = await city.obtenerNombreCiudad(ciudad)
        return result.resultado[0]
    } else return {
        error: true,
        mensaje: 'No se encontro usuario'
    }
}


var existeClienteID = async(id) => {
    var result = await clienteDAO.obtenerClienteID(id);
    if (result.resultado[0]) return true
    else return false
}

var existeClienteEmail = async(email) => {
    var result = await clienteDAO.obtenerClienteEmail(email);
    if (result.resultado[0]) return true
    else return false
}

module.exports = {
    crearCliente,
    actualizarCliente,
    login

}