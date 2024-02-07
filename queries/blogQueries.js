const { response } = require("express");
const db = require("../database/db");

const getSixBlogs = (lowerLimit, upperLimit, text) => {
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
            AND title LIKE '%${text}%';`,
      [lowerLimit, upperLimit]
    )
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

getSixBlogs();

const getSingleBlogBySlug = (slug) => {
  return db
    .query(`SELECT * FROM Blogs WHERE slug = $1`, [slug]) 
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

getSixBlogs();

// need a WHERE deleted IS NULL and published IS NOT NULL
const getFourBlogs = (slug) => {
  console.log(slug)
  return db
    .query(`SELECT
     * 
     FROM 
     (
       SELECT 
       * 
       FROM Blogs 
       WHERE published_at IS NOT NULL 
      AND deleted_at IS NULL 
      AND NOT slug = $1
      ORDER BY RANDOM() LIMIT 4
      )x 
      ORDER BY published_at DESC`, [slug])
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log("unable to query db got error:", error);
    });
};

getFourBlogs();

const addNewBlog = (title, slug, content, image, published_at, created_at, updated_at) => {

 return db.query(`INSERT INTO Blogs (title, slug, content, image, published_at, created_at, updated_at)
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`, [title, slug, content, image, published_at, created_at, updated_at])
  .then((response) => {
      return response.rows;
  })
  .catch((error) => {
      console.log("unable to query db got error:", error);
  })
}

const softDeleteBlog = (deleted_at, updated_at, slug) => {

  return db.query(`UPDATE Blogs SET deleted_at = $1, updated_at = $2 WHERE slug= $3 RETURNING *;`, [updated_at, updated_at, slug])
  .then((response) => {
      return response.rows;
  })
  .catch((error) => {
      console.log("unable to query db got error:", error);
  })
}

module.exports = { getSixBlogs, getSingleBlogBySlug, getFourBlogs, addNewBlog, softDeleteBlog };
