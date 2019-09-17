/* const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", (req, res) => {
  console.log("servidor rodando");
});

app.post("/teste", (req, res) => {
  console.log(req.body);
  console.log("caiu aqui");
  res.send("teste");
});

app.listen(3000, console.log("servidor rodando na porta 3000")); */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Hello World");
});

app.post("/teste", (req, res) => {
  console.log(req.body);
  console.log("caiu aqui");
  res.send("teste");
});

app.listen(3000);

//stoped at minute 29:40
//https://www.youtube.com/watch?v=6FOq4cUdH8k
