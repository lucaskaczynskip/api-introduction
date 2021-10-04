const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const database = require("./database/games");
const games = database.games;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Games API",
    version: "1.0"
  });
});

app.route(["/game", "/games"])
  .get((req, res) => {
    res.status(200).json(games);
  })
  .post((req, res) => {
    const created = req.body;
    const game = games.find(game => game.name == created.name || game.id == created.id);

    if (game) {
      res.status(400).json({
        message: "Game already exists."
      });
    }

    database.games.push(created);

    res.status(201).json({
      message: "Successfully created game!",
      game: {
        ...created
      }
    });
  });

app.route(["/game/:id", "/games/:id"])
  .get((req, res) => {
    const id = req.params.id;

    if (!isNaN(id)) {
      res.status(400).json({
        error: "Invalid id."
      });
    }

    const game = games.find(game => game.id == id);

    if (!game) {
      res.status(404).json({
        error: "Game not found."
      });
    }

    res.status(202).json(game);
  })
  .delete((req, res) => {
    const id = req.params.id;

    if (!isNaN(id)) {
      res.status(400).json({
        error: "Invalid id."
      });
    }

    const game = games.find(game => game.id == id);

    if (!game) {
      res.status(404).json({
        error: "Game not found."
      });
    }

    database.games.forEach((thisGame, index) => {
      if (thisGame.id == game.id) {
        database.games.splice(index, 1);
      }
    });

    res.status(200).json({
      message: "The game has been deleted.",
      game: {
        ...game
      }
    });
  })
  .put((req, res) => {
    const id = req.params.id;

    if (!isNaN(id)) {
      res.status(400).json({
        error: "Invalid id."
      });
    }

    const game = games.find(game => game.id == id);

    if (!game) {
      res.status(404).json({
        error: "Game not found."
      });
    }

    const { name, year, genre } = req.body;

    games.forEach((game, index) => {
      if (game.id == id) {
        if (name) games[index].name = name;
        if (year) games[index].year = year;
        if (genre) games[index].genre = genre;
      }
    })

    res.status(200).send({
      message: "Ok."
    })
  });  

app.listen(3000, () => {
  console.log("Server is running!");
});