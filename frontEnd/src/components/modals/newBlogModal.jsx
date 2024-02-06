import React from "react";
import { useContext, useEffect, useState } from "react";
import { getToday } from "../../helpers/dateFormatingHelper";
import { MessageContext } from "../contexts/messageContext";
import { ConfirmationTypeContext } from "../contexts/confirmationTypeContext";
import { createNewBlog } from "../../../fetchRequests/blogRoutes";
import { addPhoto, getPhoto } from "../../../fetchRequests/photoRoutes";
import xButton from "../../images/close.png";
import "./singleBlogModal.css";

function NewBlogModal(props) {
  const { animateNewBlogModal, animateSuccessModal } = props;
  const { message, setMessage } = useContext(MessageContext);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPath, setPhotoPath] = useState(null);
  const { confirmationType, setConfirmationType } = useContext(
    ConfirmationTypeContext
  );
  // useEffect(() => {
  //   setPhotoPath(`./pics/${photoFile}`);
  // }, [photoFile]);

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
        const fileName = Date.now() + "." + extension;

        //uploadPhoto
        const data = new FormData();
        data.append("image", e.target.files[0]);
        try {
          const response = await fetch(`http://localhost:5000/photo/upload`, {
            method: "POST",
            body: data,
          });
          const dataReturned = await response.json();
          setPhotoFile(dataReturned);
          setNewBlogInfo({ ...newBlogInfo, image: dataReturned });
          setPhotoPath(`./pics/${dataReturned}`);
        } catch (err) {
          console.log("error", err);
        }
        setPhotoPath(`./pics/${dataReturned}`);
      }
    } else {
      setNewBlogInfo({ ...newBlogInfo, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    setConfirmationType(1)
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
    setPhotoFile("") 
    setPhotoPath("");
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

  console.log("photo?", photoFile, newBlogInfo);

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
            <div className="inputContainer3">
              <p className="formLabels">Title:</p>
              <input
                type="text"
                name="title"
                className="searchInput2"
                value={newBlogInfo.title}
                onChange={handleChange}
              />
              </div>
            </div>

            
           

            <div className="inputContainer">
            <div className="inputContainer2">
            <p className="formLabels">Image:</p>
              <input
                type="file"
                name="image"
                style={{
                  color: "transparent",
                  marginLeft: "3vw",
                  marginTop: "3vh",
                  // width: "10vw",
                  // height: "2vh"
                }}
                onChange={handleChange}
              />
               </div>
            <input
                type="text"
                name="hyperlink"
                className="searchInput2"
                value={newBlogInfo.image}
                onChange={handleChange}
                disabled="true"
              />
            </div>

            {/* {photoPath !== null && ( */}
            {/* <div className="pickie">
              <img src={photoPath} height="100%" className="picHolder"></img>
            </div> */}
            {/* )} */}
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
