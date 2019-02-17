const pg = require('pg')
const connectionData = {
    user: 'postgres',
    host: 'myorders.cbcgx2fbwy9w.us-east-2.rds.amazonaws.com',
    database: 'order',
    password: 'postgres',
    port: 5432,
}

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