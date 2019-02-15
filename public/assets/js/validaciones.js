$("#register").submit(function(e) {
    var nombre = $("#nombre").val()
    var id = $("#id").val()
    var email = $("email").val()
    var clave = $("clave").val()
    var departamento = $("departamento").val()
    var ciudad = $("ciudad").val()
    var codigo = $("codigo").val()
    var direccion = $("direccion").val()
    var telefono = $("telefono").val()


    if (validarNombre(nombre)) {
        e.preventDefault();
        alert("ERROR")
    }
})

validarNombre = (nombre) => {
    if (nombre.length === 0 || nombre === null) {
        return { is: false }
    }
    return false
}

validarId = (id) => {
    if (id.length === 0 || id === null || id <= 7 || id >= 11) {
        return false
    }
    return false
}