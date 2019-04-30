const express = require('express');
const server = express();

const postRouter = require("./posts/post-router");

server.use(express.json());
server.use("/api/posts", postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Lambda hubs API</h2>`);
})


module.exports = server;