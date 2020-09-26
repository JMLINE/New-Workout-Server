require('dotenv').config();

var express = require('express');
var app = express();
var authTest = require('./controllers/authtestcontroller');

var testController = require('./controllers/testcontroller')
var user = require('./controllers/usercontroller')

var sequelize = require('./db')
var bodyParser = require('body-parser');

sequelize.sync(); // tip: {force: true} for resetting tables
app.use(bodyParser.json());
// app.use(express.json())
app.use(require('./middleware/headers'));



/******************
 * EXPOSED ROUTES
*******************/
app.use('/test', testController)
//Workout Log Routes
app.use('/api/user', user)


/******************
 * PROTECTED ROUTES
*******************/
app.use(require('./middleware/validate-session')); // Any routes below 'validate session' requires a token, making it a protected route //
app.use('/authtest', authTest);




app.listen(3000, function(){
    console.log('The app is listening on port 3000 dawg')
});