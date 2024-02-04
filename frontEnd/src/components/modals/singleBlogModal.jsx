import React from "react";
import { useContext, useEffect, useState } from "react";
import BlogTile from "../blogTile";
import xButton from "../../images/close.png";
import "./singleBlogModal.css";
import { SelectedSingleBlogContext } from "../contexts/selectedBlogContext";
import { MessageContext } from "../contexts/messageContext";

function SingleBlogModal(props) {
  const { animateSingleBlogModal, animateSuccessModal } = props;
  const { message, setMessage } = useContext(MessageContext);
  const { selectedBlogSlug, setSelectedBlogSlug } = useContext(
    SelectedSingleBlogContext
  );
  const [selectedBlog, setSelectedBlog] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  console.log("passing", selectedBlogSlug);

  const getSingleBlogBySlug = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/${selectedBlogSlug}`,
        {
          method: "GET",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      setSelectedBlog(data[0]);
    } catch (err) {
      console.log("error", err);
    }
  };

  const getRelatedBlogs = async () => {
    try {
      const response = await fetch(`http://localhost:5000/related`, {
        method: "POST",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      setRelatedBlogs(data);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    if (selectedBlogSlug) {
      getSingleBlogBySlug();
      getRelatedBlogs();
    }
  }, [selectedBlogSlug]);

  const delteConfirm = () => {
    setMessage(`Are you sure you want to delete "${selectedBlog.title}"?`)
    animateSuccessModal()
  }

  return (
    <div className="modalBodyContainer">
      <div onClick={() => delteConfirm()} className="deleteBlogButton">
          <p>Delete</p>
        </div>
      <div className="xBtn" onClick={() => animateSingleBlogModal()}>
        <img
          src={xButton}
          style={{
            height: "3vw",
            width: "3vw",
            marginLeft: "1vw",
          }}
        />
      </div>
      <div className="topSection">
        <h3 className="tileText">{selectedBlog.title}</h3>
        <p className="tileText">{selectedBlog.content}</p>
      </div>

      <div className="lowSection">
        <h4 className="tileText">Other blogs you may like</h4>
        <div className="tileZone2">
          {relatedBlogs &&
            relatedBlogs.map((blog) => {
              return (
                <BlogTile
                  key={blog.id}
                  blogInfo={blog}
                  animateSingleBlogModal={animateSingleBlogModal}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SingleBlogModal;
