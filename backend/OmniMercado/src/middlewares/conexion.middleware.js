const mysql = require('mysql2');
require('dotenv').config();

const conn = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
});

// Obtener una conexión del pool
conn.getConnection((err, connection) => {
    if (err) {
        console.error(`Error en la conexión a la base de datos: ${err.message}`);
        return;
    }
    console.log('Conexión establecida a la base de datos')
    connection.release()// Liberar la conexión al pool
    
});

module.exports = conn;

