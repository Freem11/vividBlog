import React from "react";
import { useContext, useEffect, useState } from "react";
import xButton from "../../images/close.png";
import "./singleBlogModal.css";

function NewBlogModal(props) {
  const { animateNewBlogModal } = props;
  const [newBlogInfo, setNewBlogInfo] = useState({
    title: "",
    slug: "",
    content: "",
    image: "",
    published_at: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
  });

  const createNewBlog = async () => {
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

  const handleChange = async (e) => {
    console.log(e.target.name, e.target.value);
    setNewBlogInfo({ ...newBlogInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    let slugCreate = Math.random().toString(36);
    let created = new Date(Date.now()); //toString()

    setNewBlogInfo({
      ...newBlogInfo,
      slug: slugCreate,
      created_at: created.toString(),
    });
    // published_at? , updated_at?
  };

  const handleClose = () => {
    animateNewBlogModal();
    setNewBlogInfo({
      title: "",
      slug: "",
      content: "",
      image: "",
      published_at: "",
      created_at: "",
      updated_at: "",
      deleted_at: "",
    });
  };

  return (
    <div className="modalBodyContainer">
      <div className="xBtn2" onClick={() => handleClose()}>
        <img
          src={xButton}
          style={{
            height: "3vw",
            width: "3vw",
            marginLeft: "1vw",
          }}
        />
      </div>
      <div className="bottomSection">
        <div className="inputContainer">
          <p>Title:</p>
          <input
            type="text"
            name="title"
            className="searchInput"
            value={newBlogInfo.title}
            onChange={handleChange}
          />
        </div>

        <div className="inputContainer">
          <p>Image:</p>
          <input
            type="text"
            name="image"
            className="searchInput"
            value={newBlogInfo.image}
            onChange={handleChange}
          />
        </div>

        <div className="inputContainerContent">
          <p>Content:</p>
          <textarea
            type="text"
            name="content"
            className="searchInputContent"
            value={newBlogInfo.content}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default NewBlogModal;
