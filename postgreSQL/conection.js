const pg = require('pg')
const connectionData = {
    user: 'postgres',
    host: 'localhost',
    database: 'order',
    password: 'postgres',
    port: 5432,
}
const conection = new pg.Client(connectionData);

module.exports = {
    conection
}