require("dotenv").config();
let express = require("express");
let app = express();

let sequelize = require("./db");

let user = require("./controllers/usercontroller.js");
let authTest = require("./controllers/authtestcontroller");
sequelize.sync();
// sequelize.sync({force: true});
app.use(require("./middleware/headers"));

app.use(express.json());
app.use("/api/user", user);

app.use(require("./middleware/validate-session"));
app.use("/authtest", authTest);
app.listen(3000, function () {
  console.log("app is listening to port 3000");
});
