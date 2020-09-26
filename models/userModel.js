module.exports = function (sequelize, DataTypes) {

    //Two variables added that fixed "Cannot find property 'define' of undefined"
    var sequelize = require('../db');
    var DataTypes = require('sequelize/lib/data-types');

    return sequelize.define('user', {

        username:DataTypes.STRING,
        passwordhash: DataTypes.STRING
    });
}