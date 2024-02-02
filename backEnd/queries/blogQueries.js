const { response } = require("express");
const db = require("../database/db");

const getAllBlogs = () => {

    return db.query(`SELECT * FROM blogs`)
    .then((response) => {
        console.log("database passed:", response.rows)
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

getAllBlogs()

module.exports = { getAllBlogs }