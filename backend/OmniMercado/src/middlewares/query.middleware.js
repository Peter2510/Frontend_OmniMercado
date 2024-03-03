
const conn = require('./conexion.middleware');

const execute = async function consultar(query,params){
    try {
        const connection = await conn.promise().getConnection(); //Obtiene la conexion del Poll
        const [result] = await connection.execute(query,params);
        connection.release(); //Para liberar la conexion
        return {query,result}
    } catch (err) {
        console.log(err)
        return {err}
        
    }
};

module.exports = {
    execute
};