const express = require("express");
app = express();
const path = require("path");
cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: `./.env` });
const db = require("./queries/blogQueries");
const multer = require("multer");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

port = process.env.PORT || 5000;

app.listen(port, () => console.log("Backend server live on " + port));

//Blog Routes

//Get Pagination Blogs (6)
app.post("/", async (req, res) => {
  
  try {
    const blogs = await db.getSixBlogs(
      req.body.lower,
      req.body.upper,
      req.body.text
    );
    res.json(blogs);
  } catch (err) {
    res.json("error:", err);
  }
});

//Get Single Blog
app.get("/:slug", async (req, res) => {
 
  try {
    const blogs = await db.getSingleBlogBySlug(req.params.slug);
    res.json(blogs);
  } catch (err) {
    res.json("error:", err);
  }
});

//Get Single Blog
app.post("/related", async (req, res) => {
  try {
    const blogs = await db.getFourBlogs();
    res.json(blogs);
  } catch (err) {
    res.json("error:", err);
  }
});

//Post New Blog
app.post("/create", async (req, res) => {
  
  try {
    const blogs = await db.addNewBlog(
      req.body.title,
      req.body.slug,
      req.body.content,
      req.body.image,
      req.body.published_at,
      req.body.created_at,
      req.body.updated_at
    );
    res.json(blogs);
  } catch (err) {
    res.status("error:", err);
  }
});

//Soft Delete Blog
app.post("/delete:slug", async (req, res) => {

  try {
    const blogs = await db.softDeleteBlog(
      req.body.updated_at,
      req.body.updated_at,
      req.body.slug
    );
    res.json(blogs);
  } catch (err) {
    res.status("error:", err);
  }
});





//Photo Routes

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./frontEnd/public/pics")
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})

let fileToSend;
let result;

//Upload Photo
app.post("/photo/upload", upload.single('image'), async (req, res) => {

  console.log("server", req.file.filename)
  res.json(req.file.filename)
  // res.send(req.file.filename)

}, (err) => {
  console.log("error:", err)
});

// Get Photos
 app.get("/photo/uploaad", (req, res) => {
  res.json(result);
});