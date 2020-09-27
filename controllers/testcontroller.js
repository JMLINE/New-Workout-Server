var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var TestModel = require("../models/testModel")(sequelize.DataTypes);
// var TestModel = sequelize.import('../models/testModel');

//Routes for Test Client

router.get("/helloclient", function (req, res) {
  res.send("This message from the server to the client biiitch.");
});

//Test Routes for Postman
router.post("/one", function (req, res) {
  res.send("Test 1 went through");
});

router.post("/two", function (req, res) {
  let testData = "Test data for endpoint two";

  TestModel.create({
    testdata: testData,
  }).then(res.send("Test two went through"));
});

router.post("/three", function (req, res) {
  var testData = req.body.testdata.item;

  TestModel.create({
    testdata: testData,
  });
  res.send("Test three went through");
  console.log("Test three went through bruh");
});

router.post("/four", function (req, res) {
  var testData = req.body.testdata.item;
  TestModel.create({
    testdata: testData,
  }).then(function messag() {
    res.send("Test 4 went through");
    console.log("Test 4 went through asynchronously bruh");
  });
});

router.post("/five", function (req, res) {
  var testData = req.body.testdata.item;
  TestModel.create({
    testdata: testData,
  }).then(function message(dataAdded) {
    res.send(dataAdded);
  });
});

router.post("/six", function (req, res) {
  var testData = req.body.testdata.item;
  TestModel.create({
    testdata: testData,
  }).then(function message(testdata) {
    res.json({
      //1
      testdata: testdata, //2
    });
  });
});

router.post("/seven", function (req, res) {
  var testData = req.body.testdata.item;
  TestModel.create({
    testdata: testData,
  }).then(
    function createSuccess(testdata) {
      res.json({
        testdata: testdata,
      });
    },
    function createError(err) {
      //1
      res.send(500, err.message);
    }
  );
});

router.get("/one", function (req, res) {
  TestModel.findAll({
    attributes: ["id", "testdata"],
  }).then(
    function findAllSuccess(data) {
      console.log("Controller data:", data);
      res.json(data);
    },
    function findAllError(err) {
      res.send(500, err.message);
    }
  );
});

module.exports = router;
