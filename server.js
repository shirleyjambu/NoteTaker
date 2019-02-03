const express = require("express");
const routes = require("./routes");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use("/NoteTaker",routes);

app.listen(PORT, function() {
  console.log("NoteTaker listening on PORT " + PORT);
});