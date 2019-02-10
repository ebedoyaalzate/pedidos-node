const clienteDAO = require('../postgreSQL/DAO/clienteDAO')

var crearCliente = async(cliente) => {
    if (!existeClienteEmail(cliente.email)) {
        await clienteDAO.insertarCliente(cliente.id, cliente.nombre, cliente.email, cliente.telefono, cliente.ciudad, cliente.codigo, cliente.direccion, cliente.clave)
    } else {
        return {
            error: true,
            mensaje: 'El correo ya tiene cuenta asociada'
        }

    }

    if (!existeClienteID(cliente.id)) {
        await clienteDAO.insertarCliente(cliente.id, cliente.nombre, cliente.email, cliente.telefono, cliente.ciudad, cliente.codigo, cliente.direccion, cliente.clave)
    } else {
        return {
            error: true,
            mensaje: 'El id ya tiene cuenta asociada'
        }
    }
}

var actualizarCliente = async(cliente) => {
    if (!existeClienteEmail(cliente.email)) {
        await clienteDAO.actualizarCliente(cliente.id, cliente.nombre, cliente.email, cliente.telefono, cliente.ciudad, cliente.codigo, cliente.direccion, cliente.clave)
    } else {
        return {
            error: true,
            mensaje: 'El correo ya tiene cuenta asociada'
        }

    }

    if (!existeClienteID(cliente.id)) {
        await clienteDAO.insertarCliente(cliente.id, cliente.nombre, cliente.email, cliente.telefono, cliente.ciudad, cliente.codigo, cliente.direccion, cliente.clave)
    } else {
        return {
            error: true,
            mensaje: 'El id ya tiene cuenta asociada'
        }
    }

}

var obtenerClienteEmail = async(email) => {
    var result = await clienteDAO.obtenerClienteEmail(email)
    if (result.resultado[0]) return result.resultado[0]
    else return {
        error: true,
        mensaje: 'No se encontro usuario'
    }
}

var obtenerClienteID = async(id) => {
    var result = await clienteDAO.obtenerClienteID(id)
    if (result.resultado[0]) return result.resultado[0]
    else return {
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