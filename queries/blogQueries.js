const { response } = require("express");
const db = require("../database/db");

const getSixBlogs = (lowerLimit, upperLimit, text) => {
  console.log("query", lowerLimit, upperLimit, text)
  return db
    .query(
      `SELECT 
        * 
        FROM 
        ( 
        SELECT 
        id, 
        title, 
        slug, 
        content, 
        image, 
        published_at, 
        created_at, 
        updated_at, 
        deleted_at, 
        ROW_NUMBER () OVER (
            ORDER BY published_at DESC
            ) 
            FROM Blogs
            ) x 
            WHERE ROW_NUMBER BETWEEN $1 AND $2 
            AND published_at IS NOT NULL 
            AND deleted_at IS NULL
            AND title LIKE '%${text}%';`, [lowerLimit, upperLimit]
    )
    .then((response) => {
      console.log("database passed:", response.rows);
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

getSixBlogs();

const getSingleBlogBySlug = (slug) => {
  console.log("query", slug)
  return db
    .query(
      `SELECT * FROM Blogs WHERE slug = $1`, [slug] )
    .then((response) => {
      console.log("database passed:", response.rows);
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

getSixBlogs();

module.exports = { getSixBlogs, getSingleBlogBySlug };
