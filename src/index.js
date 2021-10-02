const express = require("express");
const app = express();

// Controllers
const indexController = require("./controllers/IndexController");
const gameController = require("./controllers/GamesController");

// Routes
app.use("/", indexController);
app.use(["/games", "/game"], gameController);

app.listen(3000, () => {
  console.log('Server is running!');
})