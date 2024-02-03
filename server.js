const express = require("express");
app = express();
const path = require("path");
cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: `./.env` });
const db = require("./queries/blogQueries");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

port = process.env.PORT || 5000;

app.listen(port, () => console.log("Backend server live on " + port));

//Blog Routes

//Get Pagination Blogs (6)
app.post("/", async (req, res) => {
  
  console.log("server", req.body)

  try {
    const blogs = await db.getSixBlogs(req.body.lower, req.body.upper, req.body.text);
    res.json(blogs);
  } catch (err) {
    res.json("error:", err);
  }
});

//Get Single Blog
app.post("/:slug", async (req, res) => {
  
  console.log("server", req.body)

  try {
    const blogs = await db.getSingleBlogBySlug(req.body.slug);
    res.json(blogs);
  } catch (err) {
    res.json("error:", err);
  }
});
