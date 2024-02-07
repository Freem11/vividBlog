import React from "react";
import { useContext, useEffect, useState } from "react";
import BlogTile from "../blogTile";
import xButton from "../../images/close.png";
import "./singleBlogModal.css";
import "./submissionSection.css";
import "./modal.css";
import "../buttons.css";
import "./headerSection.css";
import { SelectedSingleBlogContext } from "../contexts/selectedBlogContext";
import { MessageContext } from "../contexts/messageContext";
import { ConfirmationTypeContext } from "../contexts/confirmationTypeContext";
import { getSingleBlog } from "../../../fetchRequests/blogFetches";

function SingleBlogModal(props) {
  const {
    animateSingleBlogModal,
    animateSuccessModal,
    singleBlogYCoord,
    setSingleBlogYCoord,
  } = props;
  const { setMessage } = useContext(MessageContext);
  const { selectedBlogSlug } = useContext(SelectedSingleBlogContext);
  const { setConfirmationType } = useContext(ConfirmationTypeContext);
  const [selectedBlog, setSelectedBlog] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const getSingleBlogBySlug = async () => {
    let singleBlog = await getSingleBlog(selectedBlogSlug.slug);
    if (singleBlog) {
      setSelectedBlog(singleBlog.blogs[0]);
      setRelatedBlogs(singleBlog.fourblogs);
    }
  };

  useEffect(() => {
    if (selectedBlogSlug) {
      getSingleBlogBySlug();
      // getRelatedBlogs();
    }
  }, [selectedBlogSlug]);

  const delteConfirm = () => {
    setConfirmationType(2);
    setMessage(`Are you sure you want to delete "${selectedBlog.title}"?`);
    animateSuccessModal();
  };

  return (
    <div className="modalBodyContainer">
      <div className="roundButton" onClick={() => animateSingleBlogModal()}>
        <img
          src={xButton}
          style={{
            height: "2vw",
            width: "2vw",
          }}
        />
      </div>
      <div className="topSection">
        <div
          className="topLineBox"
          style={{
            backgroundImage: `url(./pics/${selectedBlog.image})`,
            backgroundPositionY: "-0%",
            backgroundSize: "cover",
            resize: "both",
          }}
        >
          <h3 className="headerText singleBlog">{selectedBlog.title}</h3>
          <div onClick={() => delteConfirm()} className="deleteButtonBox">
            <p className="button cancel">Delete</p>
          </div>
        </div>

        <p className="blogContentText">{selectedBlog.content}</p>
      </div>

      <div className="lowSection">
        <h4 className="otherLikes">Other blogs you may like</h4>
        <div className="tileZone2">
          {relatedBlogs &&
            relatedBlogs.map((blog) => {
              return (
                <BlogTile
                  key={blog.id}
                  blogInfo={blog}
                  animateSingleBlogModal={animateSingleBlogModal}
                  singleBlogYCoord={singleBlogYCoord}
                  setSingleBlogYCoord={setSingleBlogYCoord}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SingleBlogModal;
