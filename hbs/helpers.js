const hbs = require('hbs')
const city = require('./../model/ciudad')


//helpers
hbs.registerHelper('getDepartamentos', async(departamento) => {
    var departamentos = await city.listaDepartamentos();
    return departamentos
})

hbs.registerHelper('capitalizar', (texto) => {
    let palabras = texto.split(' ');
    palabras.forEach((palabra, idx) => {
        palabras[idx] = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
    });
    return palabras.join(' ')
})