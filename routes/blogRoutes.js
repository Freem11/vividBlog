const express = require("express");
const router = express.Router();
const db = require("../queries/blogQueries");

const pullBlogs = router.post("/", (req, res) => {
  db.getSixBlogs()
    .then((data) => {
      console.log("route passed", data)
      res.json(data);
    })
    .catch((err) => {
      res.json("error:", err);
    });
});

module.exports = { pullBlogs };
