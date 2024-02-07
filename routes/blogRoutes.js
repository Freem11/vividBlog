const express = require("express");
const router = express.Router();
const db = require("../queries/blogQueries");

const grabSixBlogs = router.get("/", async (req, res) => {
  const { lower, upper, text } = req.query;

  try {
    // if (!lower || typeof lower !== "number") throw new Error("Invalid Entry");
    // if (!upper || typeof upper !== "number") throw new Error("Invalid Entry");
    // if (!text || typeof text !== "string") throw new Error("Invalid Entry");

    const blogs = await db.getSixBlogs(lower, upper, text);
    res.json(blogs);
  } catch (err) {
    res.json("error:", err);
  }
});

const grabSingleBlog = router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    if (!slug || typeof slug !== "string") throw new Error("Invalid Entry");

    const blogs = await db.getSingleBlogBySlug(slug);
    const fourblogs = await db.getFourBlogs();
    let arr = []
    arr.push(blogs)
    arr.push(fourblogs)
    res.json(arr);
  } catch (err) {
    res.json("error:", err);
  }
});

const addNewBlog = router.post("/create", async (req, res) => {
  const {
    title,
    slug,
    content,
    image,
    published_at,
    created_at,
    updated_at,
  } = req.body;

  if (!title || typeof title !== "string") throw new Error("Invalid Entry");
  if (!slug || typeof slug !== "string") throw new Error("Invalid Entry");
  if (!content || typeof content !== "string") throw new Error("Invalid Entry");
  if (!image || typeof image !== "string") throw new Error("Invalid Entry");
  if (!published_at || typeof published_at !== "string")
    throw new Error("Invalid Entry");
  if (!created_at || typeof created_at !== "string")
    throw new Error("Invalid Entry");
  if (!updated_at || typeof updated_at !== "string")
    throw new Error("Invalid Entry");

  try {
    const blogs = await db.addNewBlog(
      title,
      slug,
      content,
      image,
      published_at,
      created_at,
      updated_at
    );
    res.json(blogs);
  } catch (err) {
    res.status("error:", err);
  }
});

const removeBlog = router.post("/delete:slug", async (req, res) => {
  const { updated_at, slug } = req.body;

  try {
    if (!updated_at || typeof updated_at !== "string") throw new Error("Invalid Entry");
    if (!slug || typeof slug !== "string") throw new Error("Invalid Entry");
 
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

module.exports = {
  grabSixBlogs,
  grabSingleBlog,
  addNewBlog,
  removeBlog,
};
