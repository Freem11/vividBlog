import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BlogTile from "./blogTile";
import rightArrow from "../images/right-arrow.png";
import "./blogSearch.css";

function BlogSearch() {
  const [blogList, setBlogList] = useState([]);
  const [limits, setLimits] = useState({ upper: 6, lower: 1, text: "" });
  const [direction, setDirection] = useState("");

  const pullAllBlogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        body: JSON.stringify(limits),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();

      //check if at begining or end of data
      if (data.length === 0) {
          console.log
        direction === "plus"
          ? setLimits({ ...limits, upper: limits.upper - 6, lower: limits.lower - 6 })
          : setLimits({ ...limits, upper: limits.upper + 6, lower: limits.lower + 6 });
      } else {
        setBlogList(data);
      }
      
      setDirection("")
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
    console.log(e.target.value);
    setLimits({ ...limits, text: e.target.value });
  };

  const shiftRight = () => {
    setLimits({ ...limits, upper: limits.upper + 6, lower: limits.lower + 6 });
    setDirection("plus");
  };

  const shiftLeft = () => {
    setLimits({ ...limits, upper: limits.upper - 6, lower: limits.lower - 6 });
    setDirection("minus");
  };

  return (
    <div className="blogSearchContainer">
      <div className="searchBox">
        <p className="searchText">Title Search:</p>
        <input
          type="text"
          className="searchInput"
          value={limits.text}
          onChange={handleChange}
        />
      </div>

      <div className="controls">
        <div className="arrowWrapperLeft" onClick={shiftLeft}>
          <img
            src={rightArrow}
            style={{
              height: "3vw",
              width: "3vw",
              marginLeft: "1.5vw",
            }}
          />
        </div>
        <div className="tileZone">
          {blogList &&
            blogList.map((blog) => {
              return <BlogTile key={blog.id} blogInfo={blog} />;
            })}
        </div>
        <div className="arrowWrapperRight" onClick={shiftRight}>
          <img
            src={rightArrow}
            style={{
              height: "3vw",
              width: "3vw",
              marginLeft: "1vw",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogSearch;
