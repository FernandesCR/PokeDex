const Sequelize = require('sequelize');

const sequelize = new Sequelize("pokeapi", "root", "root", {
    host: '127.0.0.1',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log("Conexão com o banco de dados realizada com sucesso!");
}).catch(function(){
    console.log("Erro: Conexão com o banco de dados não realizada com sucesso!");
});

module.exports = sequelize;