var sql = require('mysql');

async function getGame(){
    try{
        let pool = await sql.connect(config);
        let products = pool.request().query("Select * from Game");
        return products.recordsets;
    } catch (error){
        console.log(error)
    }
}

module.exports = {
    getGame : getGame
}