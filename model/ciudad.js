const axios = require('axios');

var listaDepartamentos = async() => {
    let resp = await axios.get(`https://www.datos.gov.co/resource/xdk5-pm3f.json`);
    var departamentos = [];
    resp.data.forEach(function(ciudad) {
        departamentos.push(ciudad.departamento)
    });

    departamentos = removerRepetidos(departamentos);
    return departamentos;

}

var obtenerCiudadesDep = async(dep) => {
    let resp = await axios.get(`https://www.datos.gov.co/resource/xdk5-pm3f.json`);
    var ciudades = []
    resp.data.forEach(function(ciudad) {
        if (dep === ciudad.departamento) {
            ciudades.push(ciudad.municipio)
        }
    });
    console.log(ciudades);
    return ciudades

}

var obtenerCodigo = async(nombre) => {
    let resp = await axios.get(`https://www.datos.gov.co/resource/xdk5-pm3f.json`);
    var codigo
    resp.data.forEach(function(ciudad) {
        if (ciudad.municipio === nombre) {
            codigo = ciudad.c_digo_dane_del_municipio
        }
    });
    console.log(codigo);
    return codigo
}

var obtenerNombreCiudad = async(codigo) => {
    let resp = await axios.get(`https://www.datos.gov.co/resource/xdk5-pm3f.json`);
    var nombre
    resp.data.forEach(function(ciudad) {
        if (ciudad.ciudad.c_digo_dane_del_municipio === codigo) {
            nombre = ciudad.municipio
        }
    });
    console.log(codigo);
    return codigo
}

var removerRepetidos = (arrayActual) => {
    var nuevoArray = []
    var flag = false
    arrayActual.forEach(function(item) {
        nuevoArray.forEach(function(i) {
            if (item === i) {
                flag = true
            }
        })
        if (!flag) {
            nuevoArray.push(item)
        }
        flag = false
    })
    return nuevoArray
}



module.exports = {
    listaDepartamentos,
    obtenerCiudadesDep,
    obtenerCodigo,
    obtenerNombreCiudad
}