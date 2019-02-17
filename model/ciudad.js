const axios = require('axios');

var listaDepartamentos = async() => {
    let resp = await axios.get(`https://www.datos.gov.co/resource/xdk5-pm3f.json`);
    var departamentos = [];
    resp.data.forEach(function(ciudad) {
        departamentos.push(ciudad.departamento)
    });

    departamentos = removerRepetidos(departamentos);


    return departamentos.sort();

}


var obtenerCiudadesDep = async(dep) => {
    let resp = await axios.get(`https://www.datos.gov.co/resource/xdk5-pm3f.json`);
    var ciudades = []
    resp.data.forEach(function(ciudad) {
        if (dep === ciudad.departamento) {
            ciudades.push(ciudad.municipio)
        }
    });
    return ciudades.sort()

}

var obtenerCodigo = async(nombre) => {
    let resp = await axios.get(`https://www.datos.gov.co/resource/xdk5-pm3f.json`);
    var codigo
    resp.data.forEach(function(ciudad) {
        if (ciudad.municipio === nombre) {
            codigo = ciudad.c_digo_dane_del_municipio
        }
    });
    return codigo
}

var obtenerNombreCiudad = async(codigo) => {
    let resp = await axios.get(`https://www.datos.gov.co/resource/xdk5-pm3f.json`);
    var nombre
    resp.data.forEach(function(ciudad) {
        if (ciudad.c_digo_dane_del_municipio === codigo) {
            nombre = ciudad.municipio
        }
    });
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


var existeDepartamento = async(departamento) => {
    var resp = await listaDepartamentos();
    var existe;
    resp.forEach(dep => {
        if (dep == departamento) {
            existe = true
        }
    })
    if (existe) return existe
    return false
}

var existeCiudad = async(ciudad) => {
    let resp = await axios.get(`https://www.datos.gov.co/resource/xdk5-pm3f.json`);
    var existe
    resp.data.forEach(function(city) {
        if (city.municipio === ciudad) {
            existe = true
        }
    });
    if (existe) return true
    return false
}



module.exports = {
    listaDepartamentos,
    obtenerCiudadesDep,
    obtenerCodigo,
    obtenerNombreCiudad,
    existeDepartamento,
    existeCiudad
}