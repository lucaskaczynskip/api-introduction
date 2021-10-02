const router = require("express").Router();
const database = require("../database/games");

router.get("/", (req, res) => {
  res.status(200).json(
    database.games
  );
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  
  const games = database.games;
  const game = games.find(game => game.id == id);

  if (!game) {
    res.status(404).send({
      message: "Game not found!"
    })
  }

  res.status(201).send(game);
})

module.exports = router;