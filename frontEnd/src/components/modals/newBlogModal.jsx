import React from "react";
import { useContext, useState } from "react";
import { getToday } from "../../helpers/dateFormatingHelper";
import { MessageContext } from "../contexts/messageContext";
import { ConfirmationTypeContext } from "../contexts/confirmationTypeContext";
import { createNewBlog } from "../../../fetchRequests/blogFetches";
import xButton from "../../images/close.png";
import "./singleBlogModal.css";
import "./modal.css";
import "./submissionSection.css";
import "../buttons.css";
import "./headerSection.css";

function NewBlogModal(props) {
  const { animateNewBlogModal, animateSuccessModal } = props;
  const { setMessage } = useContext(MessageContext);
  const { setConfirmationType } = useContext(ConfirmationTypeContext);

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

    let newBlog = await createNewBlog(dataPackage);
    if (newBlog) {
      setMessage("Your New Blog was sucessfully Created!");
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
      animateSuccessModal();
    } else {
      animateSuccessModal();
      setMessage("There was an error creating your mesage, please try again");
    }
  };

  const handleChange = async (e) => {
    if (e.target.name === "image") {
      if (e.target.files[0]) {
        let image = e.target.files[0];
        let extension = image.name.split(".").pop();

        //uploadPhoto
        const data = new FormData();
        data.append("image", e.target.files[0]);
        try {
          const response = await fetch(`http://localhost:5000/photo/upload`, {
            method: "POST",
            body: data,
          });
          const dataReturned = await response.json();
          setNewBlogInfo({ ...newBlogInfo, image: dataReturned });
        } catch (err) {
          console.log("error", err);
        }
      }
    } else {
      setNewBlogInfo({ ...newBlogInfo, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    setConfirmationType(1);
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
      setMessage(
        "Your Blog is still incomplete! \n Please make sure to have a Title, Image and your Content in place before submitting"
      );
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
  };

  return (
    <div className="modalBodyContainer createModal">
      <h1 className="headerText">Create a new blog</h1>
      <div className="roundButton" onClick={() => handleClose()}>
        <img
          src={xButton}
          style={{
            height: "2vw",
            width: "2vw",
          }}
        />
      </div>
      <div className="midSection">
        <div className="leftSide">
          <div className="inputHolder">
            <div className="inputContainer">
              <div className="inputContainerTitle inputTitle">
                <p className="formLabel">Title:</p>
              </div>
              <input
                type="text"
                name="title"
                className="searchInput"
                value={newBlogInfo.title}
                onChange={handleChange}
              />
            </div>

            <div className="inputContainer">
              <div className="inputContainerTitle inputImage">
                <p className="formLabel image">Image:</p>
                <input
                  type="file"
                  name="image"
                  style={{
                    color: "transparent",
                    marginLeft: "3vw",
                    marginBottom: "0.5vh",
                    cursor: "pointer",
                  }}
                  onChange={handleChange}
                />
              </div>
              <input
                type="text"
                name="hyperlink"
                className="searchInput"
                value={newBlogInfo.image}
                onChange={handleChange}
                disabled={true}
              />
            </div>
          </div>
        </div>

        <div className="rightSide">
          <div className="inputContainer inputContent">
            <p className="formLabel content">Enter Your Content:</p>
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

      <div className="submitSection two-buttons createForm">
        <div className="button" onClick={() => handleSubmit()}>
          <p>Post Blog</p>
        </div>

        <div className="button cancel" onClick={() => handleClose()}>
          <p>Cancel Blog Post</p>
        </div>
      </div>
    </div>
  );
}

export default NewBlogModal;
