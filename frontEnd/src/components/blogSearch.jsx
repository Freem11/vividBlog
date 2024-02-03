import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import BlogTile from "./blogTile";
import "./blogSearch.css"

function BlogSearch() {

    const [blogList, setBlogList] = useState([]);
    const [limits, setLimits] = useState({upper: 6, lower: 1, text: ""});
  
    const pullAllBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/", {
            method: "POST",
            body: JSON.stringify(limits),
            headers: {'content-type': "application/json"}
          })
        const data = await response.json();
        setBlogList(data);
      } catch (err) {
        console.log("error", err);
      }
    };
  
    useEffect(() => {
      pullAllBlogs();
    }, []);

    useEffect(() => {
        pullAllBlogs();
      }, [limits]);

    const handleChange = async (e) => {
        console.log(e.target.value)
        setLimits({ ...limits, text: e.target.value });
      };

      console.log(limits.text)
    return (
        <div className="blogSearchContainer">
            <div className="searchBox">
            <p className="searchText">Title Search:</p>
            <input type="text" className="searchInput" value={limits.text} onChange={handleChange}/>
            </div>
              

        <div className="tileZone">
             {blogList &&
        blogList.map((blog) => {
          return (
            <BlogTile key={blog.id} blogInfo={blog}/>
          );
        })}
        </div>
        </div>
    )
}

export default BlogSearch
