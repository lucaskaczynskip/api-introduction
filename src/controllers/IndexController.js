const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to Games API",
    version: "1.0"
  });
});

module.exports = router;