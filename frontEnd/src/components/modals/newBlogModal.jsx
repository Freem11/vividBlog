import React from "react";
import { useContext, useEffect, useState } from "react";
import { getToday } from "../../helpers/dateFormatingHelper";
import { MessageContext } from "../contexts/messageContext";
import { createNewBlog } from "../../../fetchRequests/blogRoutes";
import xButton from "../../images/close.png";
import "./singleBlogModal.css";

function NewBlogModal(props) {
  const { animateNewBlogModal, animateSuccessModal } = props;
  const { message, setMessage } = useContext(MessageContext);
  const [newBlogInfo, setNewBlogInfo] = useState({
    title: "",
    slug: "",
    content: "",
    image: "",
    published_at: "",
    created_at: "",
  });

  const generateNewBlog = async (newBlogInfo, slug, date) => {
    let dataPackage = {
      title: newBlogInfo.title,
      slug: slug,
      content: newBlogInfo.content,
      image: newBlogInfo.image,
      published_at: date,
      created_at: date,
      updated_at: date,
    };

    let newBlog = await createNewBlog(dataPackage)
      if (newBlog) {
        setMessage("Your New Blog was sucessfully Created!");
        animateSuccessModal();
      } else {
        animateSuccessModal();
        setMessage("There was an error creating your mesage, please try again");
      }
  };

  const handleChange = async (e) => {
    setNewBlogInfo({ ...newBlogInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    let slugCreate = Math.random().toString(36);
    let created = new Date(Date.now()); //toString()
    let formattedDate = getToday(created);

    if (
      newBlogInfo.title.length === 0 ||
      newBlogInfo.title.length === null ||
      newBlogInfo.image.length === 0 ||
      newBlogInfo.image.length === null ||
      newBlogInfo.content.length === 0 ||
      newBlogInfo.content.length === null
    ) {
      setMessage("Your Blog is still incomplete! \n Please make sure to have a Title, Image and your Content in place before submitting")
      animateSuccessModal();
    } else {
      generateNewBlog(newBlogInfo, slugCreate, formattedDate);
    }
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
    console.log(newBlogInfo)
  };

  return (
    <div className="modalBodyContainerCreate">
      <h1 className="headerTextCreate">Create a new blog</h1>
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
      <div className="midSection">

        <div className="leftSide">
        <div className="inputHodler">
        <div className="inputContainer">
          <p  className="formLabels">Title:</p>
          <input
            type="text"
            name="title"
            className="searchInput2"
            value={newBlogInfo.title}
            onChange={handleChange}
          />
        </div>

        <div className="inputContainer">
          <p className="formLabels">Image:</p>
          <input
            type="text"
            name="image"
            className="searchInput2"
            value={newBlogInfo.image}
            onChange={handleChange}
          />
        </div>
        </div>
        </div>

        <div className="rightSide">
        <div className="inputContainerContent">
          <p className="formLabels2">Enter Your Content:</p>
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

      <div className="submitSection">
        <div className="submitBtn" onClick={() => handleSubmit()}>
          <p>Post Blog</p>
        </div>

        <div className="cancelBtn" onClick={() => handleClose()}>
          <p>Cancel Blog Post</p>
        </div>
      </div>
    </div>
  );
}

export default NewBlogModal;
