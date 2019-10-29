const express = require("express");

const db = require("../data/db.js");

const router = express.Router();

// get all data
router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved" });
    });
});

router.get("/:id", async (req, res) => {
  try {
    const postById = await db.findById(req.params.id);

    if (postById) {
      res.status(200).json(postById);
    } else {
      res.status(404).json({ message: "Hub not found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the hub"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json("Please provide title and contents for the post.");
    }

    const newPost = await db.insert(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({
      message: "Error adding new post."
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The post has been nuked!" });
    } else {
      res.status(404).json({ message: "The post could not be found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error removing the post." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const postUpdate = await db.update(req.params.id, req.body);
    if (postUpdate) {
      res.status(200).json(postUpdate);
    } else {
      res.status(404).json({ message: "The post could not be found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating the post." });
  }
});

module.exports = router;
