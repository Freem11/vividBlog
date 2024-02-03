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

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/dist")));
// } else {
//   app.use(express.static(path.join(__dirname, "../frontEnd/index.html")));
// }

app.listen(port, () => console.log("Backend server live on " + port));

//Blog Routes

app.get("/", async (req, res) => {
  try {
    const blogs = await db.getAllBlogs();
    res.json(blogs);
  } catch (err) {
    res.json("error:", err);
  }
});
