const base = "C:/Users/33751/Documents/M12/S2/SOR/node/serveur_http" // !!!!! À MODIFIER !!!!!!
const port_http = 3000

const mysql2 = {
    host: 'localhost',
    user: 'root',
    password: "zoldyc2011",
    database: 'livres',
    port: 3308,
    
    // pour pool de connexions
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

module.exports = {
    mysql2 : mysql2,
    base : base,
    port_http : port_http
}