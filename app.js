const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

//ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

//routes
app.post("/teste", (req, res) => {
  console.log(req.body);
  res.send("teste");
});
//app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

//Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Mongoose
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

app.listen(PORT, console.log(`Server started on port ${PORT}`));
