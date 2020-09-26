// var router = require('express').Router();
var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = require('../models/userModel')(sequelize.DataTypes);

//Model
var AuthTestModel = require('../models/authtest')(sequelize.DataTypes);

/*************************************
* GET ALL ITEMS FOR INDIVIDUAL USER
*************************************/
router.get('/getall', function (req, res) {
 var userid = req.user.id;
 AuthTestModel
 .findAll({
 where: { owner: userid }
 })
 .then(
 function findAllSuccess(data) {
 res.json(data);
 },
 function findAllError(err) {
 res.send(500, err.message);
 }
 );
});


/*************************************
* POST SINGLE ITEM FOR INDIVIDUAL USER
*************************************/
router.post('/create', function (req, res) {
 var owner = req.user.id;
 var authTestData = req.body.authtestdata;
 
 console.log(authTestData);
 res.send(authTestData);
 AuthTestModel.create({

 authtestdata: authTestData,
 owner: owner
 })
 .then(
 function createSuccess(authtestdata) {
 res.json({
 authtestdata: authtestdata
 });
 },
 function createError(err) {
 res.send(500, err.message);
 }
 );
});


/******************
* GET SINGLE ITEM FOR INDIVIDUAL USER
******************/
router.get('/:id', function(req, res) {
 var data = req.params.id;
 var userid = req.user.id;
 AuthTestModel
 .findOne({
 where: { id: data, owner: userid }
 }).then(
 function findOneSuccess(data) {
 res.json(data);
 },
 function findOneError(err) {
 res.send(500, err.message);
 }
 );
});


/******************
* DELETE ITEM FOR INDIVIDUAL USER
******************/
 //1 //2
 router.delete('/delete/:id', function(req, res) {
    var data = req.params.id; //3
    var userid = req.user.id; //4
    AuthTestModel
    .destroy({ //5
    where: { id: data, owner: userid } //6
    }).then(
    function deleteLogSuccess(data){ //7
    res.send("you removed a log");
    },
    function deleteLogError(err){ //8
    res.send(500, err.message);
    }
    );
   });


/******************
* UPDATE ITEM FOR INDIVIDUAL USER
******************/
 //1 //2
router.put('/update/:id', function(req, res) {
    var data = req.params.id; //3
    var authtestdata = req.body.authtestdata.item; //4
    AuthTestModel
    .update({ //5
    authtestdata: authtestdata //6
    },
    {where: {id: data}} //7
    ).then(
    function updateSuccess(updatedLog) { //8
    res.json({
    authtestdata: authtestdata
    });
    },
    function updateError(err){ //9
    res.send(500, err.message);
    }
    )
   });
   
   

module.exports = router;