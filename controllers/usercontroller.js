const router = require("express").Router();
const User = require("../db").import("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Model

router.post("/createuser", function (req, res) {
  User.create({
    username: req.body.user.username,
    passwordhash: bcrypt.hashSync(req.body.user.passwordhash, 13),
  }).then(
    function createSuccess(user) {
      var cred = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 12,
      });

      res.json({
        user: user,
        message: "created",
        userToken: cred,
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

router.post("/signin", function (req, res) {
  User.findOne({
    where: {
      username: req.body.user.username,
    },
  }).then(
    function (userInfo) {
      if (userInfo) {
        bcrypt.compare(
          req.body.user.passwordhash,
          userInfo.passwordhash,
          function (err, matches) {
            if (matches) {
              var cred = jwt.sign({ id: userInfo.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 12,
              });

              res.json({
                user: userInfo,
                message: "You're authenitcated",
                userToken: cred,
              });
            } else {
              res.status(502).send({ error: "502 error dawg" });
            }
          }
        );
      } else {
        res.status(500).send({
          error: "you failed to authenticate, G",
        });
      }
    },
    function (err) {
      res.status(501).send({
        error: "This failure message comes from the 2nd error function",
      });
    }
  );
});

module.exports = router;
