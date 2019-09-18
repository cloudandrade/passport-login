const express = require("express");
const bodyParser = require("body-parser");

const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

//EXPRESS
const app = express();

//SERVER PORT
const PORT = process.env.PORT || 5000;

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



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
