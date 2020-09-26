
module.exports = function (sequelize, DataTypes) {

    //Two variables added that fixed "Cannot find propert 'define' of undefined"
    var sequelize = require('../db');
    var DataTypes = require('sequelize/lib/data-types');

    return sequelize.define('test', {
    
    testdata:DataTypes.STRING
    });
   };
   