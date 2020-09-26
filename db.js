const Sequelize = require('sequelize');

const sequelize = new Sequelize('Workout Log', 'postgres', 'password', {
 host: 'localhost',
 dialect: 'postgres'
});


sequelize.authenticate().then(
 function() {
 console.log('Connected to pgAdmin workout log database, let\'s get it!');
 },
 function(err){
 console.log('Not connected to pgAdmin yet fam');
 }
);

module.exports = sequelize;
