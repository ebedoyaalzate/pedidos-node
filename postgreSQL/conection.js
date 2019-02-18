const pg = require('pg')
const connectionData = {
    user: 'eikgclcaqmrnzo',
    host: 'ec2-23-23-184-76.compute-1.amazonaws.com',
    database: 'ddvf8hj9crsbbi',
    password: '1a170cdfe6421f167e4ba0f098ef6dad7b7b4626d20549bbbf2ace7c8b0b1a5f',
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