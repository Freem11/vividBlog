import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BlogTile from "./blogTile";
import rightArrow from "../images/right-arrow.png";
import "./blogSearch.css";
import { getSixBlog } from "../../fetchRequests/blogRoutes";

function BlogSearch(props) {
  const {
    animateSingleBlogModal,
    animateNewBlogModal,
    singleBlogYCoord,
    newBlogYCoord,
    successYCoord,
  } = props;
  const [blogList, setBlogList] = useState([]);
  const [limits, setLimits] = useState({ upper: 6, lower: 1, text: "" });
  const [direction, setDirection] = useState("");

  const pullAllBlogs = async () => {

    let sixBlogs = await getSixBlog(limits)
    if (sixBlogs) {
      if (sixBlogs.length === 0) {
        direction === "plus"
          ? setLimits({
              ...limits,
              upper: limits.upper - 6,
              lower: limits.lower - 6,
            })
          : setLimits({
              ...limits,
              upper: limits.upper + 6,
              lower: limits.lower + 6,
            });
      } else {
        setBlogList(sixBlogs);
      }
      setDirection("");
    }
  };

  useEffect(() => {
    pullAllBlogs();
  }, []);

  useEffect(() => {
    pullAllBlogs();
  }, [limits, singleBlogYCoord, newBlogYCoord, successYCoord]);

  const handleChange = async (e) => {
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

  let label = "Compose"

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
        <div onClick={() => animateNewBlogModal()} className="newBlogButton">
          <p className="ComposeButton">Compose</p>
        </div>
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
              return (
                <BlogTile
                  key={blog.id}
                  blogInfo={blog}
                  animateSingleBlogModal={animateSingleBlogModal}
                />
              );
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
