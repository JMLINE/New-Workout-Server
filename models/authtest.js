module.exports = function(sequelize, DataTypes) {

    var sequelize = require('../db');
    var DataTypes = require('sequelize/lib/data-types');
    
    return sequelize.define('authtestdata', {
        authtestdata:DataTypes.STRING,
        owner: DataTypes.INTEGER
    })
}