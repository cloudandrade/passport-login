const express = require("express");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");

//passport config
require("./config/passport")(passport);

//EXPRESS
const app = express();

//SERVER PORT
const PORT = process.env.PORT || 5000;

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

//MONGOOSE
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/passport", { useNewUrlParser: true })
  .then(() => {
    console.log("Mongodb connected...");
  })
  .catch(erro => {
    console.log(
      "houve um problema ao se conectar ao banco de dados, erro: " + erro
    );
  });

//SERVER
app.listen(PORT, console.log(`Server started on port ${PORT}`));
