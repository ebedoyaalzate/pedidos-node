const hbs = require('hbs')
const city = require('./../model/ciudad')


//helpers
hbs.registerHelper('getCiudades', async(departamento) => {
    ciudades = await city.obtenerCiudadesDep(departamento)
    console.log(ciudades);
    return ciudades
})

hbs.registerHelper('capitalizar', (texto) => {
    let palabras = texto.split(' ');
    palabras.forEach((palabra, idx) => {
        palabras[idx] = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
    });
    return palabras.join(' ')
})