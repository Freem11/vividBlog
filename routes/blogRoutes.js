const express = require('express');
const router = express.Router();
const db = require("../queries/blogQueries");

const grabSixBlogs = router.get("/", (req, res) => {
    console.log("route", req.body)
    try {
        const blogs = db.getSixBlogs(
          req.body.lower,
          req.body.upper,
          req.body.text
        );
        res.json(blogs);
      } catch (err) {
        res.json("error:", err);
      }
});

module.exports = { grabSixBlogs }