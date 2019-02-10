const pg = require('pg')
const connectionData = {
        user: 'postgres',
        host: 'localhost',
        database: 'order',
        password: 'postgres',
        port: 5432,
    }
    //const conection = new pg.Client(connectionData);

var query = (text, params) => {
    var pool = new pg.Client(connectionData);
    pool.connect()
    return new Promise((resolve, reject) => {
        pool.query(text, params)
            .then((res) => {
                pool.end()
                resolve(res);
            })
            .catch((err) => {
                pool.end()
                reject(err);
            })
    })
}

module.exports = {
    query
}