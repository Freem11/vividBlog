const express = require("express");
app = express();
const path = require("path");
cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: `./.env` });
const multer = require("multer");
const { grabSixBlogs, grabSingleBlog, addNewBlog, removeBlog } = require("./routes/blogRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

port = process.env.PORT || 5000;

app.listen(port, () => console.log("Backend server live on " + port));

//Blog Routes

//Get Pagination Blogs (6)
app.use("/", grabSixBlogs)

//Get Single Blog
app.use("/:slug", grabSingleBlog);

//Post New Blog
app.post("/create", addNewBlog);

//Soft Delete Blog
app.post("/delete:slug", removeBlog);

//Photo Routes

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./frontEnd/public/pics");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

let fileToSend;
let result;

//Upload Photo
app.post(
  "/photo/upload",
  upload.single("image"),
  async (req, res) => {
    res.json(req.file.filename);
  },
  (err) => {
    console.log("error:", err);
  }
);

