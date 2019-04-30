const express = require("express");

const db = require("../data/db.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getPosts = await db.find();
    res.status(200).json(getPosts);
  } catch (err) {
    res.status(500).json("The posts information could not be retrieved.");
  }
});

module.exports = router;