const clienteDAO = require('../postgreSQL/DAO/clienteDAO')
const city = require('./ciudad')

var crearCliente = async(cliente) => {
    var validarCli = await validarCliente(cliente)
    if (validarCli.ok) {
        var existeClienteE = await existeClienteEmail(cliente.email);
        var codigoCiudad = await city.obtenerCodigo(cliente.ciudad)
        if (!existeClienteE) {
            var existeClienteI = await existeClienteID(cliente.id);
            if (!existeClienteI) {
                var res = await clienteDAO.insertarCliente(cliente.id, cliente.nombre, cliente.email, cliente.telefono, codigoCiudad, cliente.codigo, cliente.direccion, cliente.clave)
                return {
                    ok: true,
                    mensaje: 'Se guardo correctamente el usuario'
                }
            } else {
                return {
                    ok: false,
                    mensaje: 'El id ya tiene cuenta asociada'
                }
            }
        } else {
            return {
                ok: false,
                mensaje: 'El correo ya tiene cuenta asociada'
            }

        }
    } else {
        return validarCli
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

var login = async(user, pass) => {
    var cliente
    if (user.indexOf("@") < 0) {
        cliente = await obtenerClienteID(user)
    } else {
        cliente = await obtenerClienteEmail(user)
    }
    if (cliente.error) return { error: true, mensaje: cliente.mensaje }

    if (cliente.clave === pass) return { error: false, mensaje: "Exitoso", cliente: cliente }
    else return { error: true, mensaje: "Error en la contraseña" }
}

var obtenerClienteEmail = async(email) => {
    var result = await clienteDAO.obtenerClienteEmail(email)
    var ciudad
    if (result.rows > 0) {
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
    if (result.rows > 0) {
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
    if (result.rows >= 1) return true
    else return false
}

var existeClienteEmail = async(email) => {
    var result = await clienteDAO.obtenerClienteEmail(email);
    if (result.rows >= 1) return true
    else return false
}

var validarCliente = async(cliente) => {
    var emailCad = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (cliente != undefined && cliente.id != undefined && cliente.nombre != undefined && cliente.email != undefined && cliente.telefono != undefined && cliente.ciudad != undefined && cliente.codigo != undefined && cliente.direccion != undefined && cliente.clave != undefined) {
        if (emailCad.test(cliente.email)) {
            var existeCity = await city.existeCiudad(cliente.ciudad)
            if (existeCity) {
                if (cliente.clave.length >= 6) {
                    return { ok: true, mensaje: "Datos validos" }
                } else return { ok: false, mensaje: "La clave debe tener minimo 6 digitos" }
            } else return { ok: false, mensaje: "El municipio no existe en Colombia" }
        } else return { ok: false, mensaje: "Correo no valido" }
    } else return { ok: false, mensaje: "No se enviaron todos los parametros" }

}

module.exports = {
    crearCliente,
    actualizarCliente,
    login,
    obtenerClienteID

}