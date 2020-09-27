var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var User = sequelize.import("../models/userModel");
var AuthTestModel = sequelize.import("../models/authtest");

router.get("/getall", function (req, res) {
  var userid = req.user.id;
  AuthTestModel.findAll({
    where: { owner: userid },
  }).then(
    function findAllSuccess(data) {
      res.json(data);
    },
    function findAll(err) {
      res.send(500, err.message);
    }
  );
});

router.post("/create", function (req, res) {
  var owner = req.user.id;
  var authTestData = req.body.authtestdata.item;
  AuthTestModel.create({
    authtestdata: authTestData,
    owner: owner,
  }).then(
    function createSuccess(authtestdata) {
      res.json({
        authtestdata: authtestdata,
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

router.get("/:id", function (req, res) {
  var primaryKey = req.params.id;
  var userid = req.user.id;
  AuthTestModel.findOne({
    where: { id: primaryKey, owner: userid },
  }).then((data) => {
    return data /*if not null*/
      ? res.json(data) /*display data*/
      : res.send("Not Authorized to view row") /*else show error*/;
  }),
    (err) => res.send(500, err.message);
});

router.delete("/delete/:id", function (req, res) {
  var primaryKey = req.params.id;
  var userid = req.user.id;

  AuthTestModel.destroy({
    where: { id: primaryKey, owner: userid },
  }).then((data) => {
    return data > 0
      ? res.send("Item was deleted")
      : res.send("Nothing deleted");
  }),
    (err) => res.send(500, err.message);
});

router.put("/update/:id", function (req, res) {
  var userid = req.user.id;
  var primaryKey = req.params.id;
  var authtestdata = req.body.authtestdata.item;

  AuthTestModel.update(
    {
      authtestdata: authtestdata,
    },
    { where: { id: primaryKey, owner: userid } }
  ).then((data) => {
    return res.json(data);
  }),
    (err) => res.send(500, err.message);
});
module.exports = router;
