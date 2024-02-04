import React from "react";
import { useContext, useEffect, useState } from "react";
import BlogTile from "../blogTile";
import xButton from "../../images/close.png";
import "./singleBlogModal.css";
import { SelectedSingleBlogContext } from "../contexts/selectedBlogContext";
import { MessageContext } from "../contexts/messageContext";
import { ConfirmationTypeContext } from "../contexts/confirmationTypeContext";
import { getSingleBlog, getFourBlogs } from "../../../fetchRequests/blogRoutes";

function SingleBlogModal(props) {
  const { animateSingleBlogModal, animateSuccessModal } = props;
  const { message, setMessage } = useContext(MessageContext);
  const { selectedBlogSlug, setSelectedBlogSlug } = useContext(
    SelectedSingleBlogContext
  );
  const { confirmationType, setConfirmationType } = useContext(
    ConfirmationTypeContext
  );
  const [selectedBlog, setSelectedBlog] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const getSingleBlogBySlug = async () => {
    let singleBlog = await getSingleBlog(selectedBlogSlug);
    if (singleBlog) {
      setSelectedBlog(singleBlog);
    }
  };

  const getRelatedBlogs = async () => {
    let relatedFourBlogs = await getFourBlogs();
    if (relatedFourBlogs) {
      setRelatedBlogs(relatedFourBlogs);
    }
  };

  useEffect(() => {
    if (selectedBlogSlug) {
      getSingleBlogBySlug();
      getRelatedBlogs();
    }
  }, [selectedBlogSlug]);

  const delteConfirm = () => {
    setConfirmationType(2);
    setMessage(`Are you sure you want to delete "${selectedBlog.title}"?`);
    animateSuccessModal();
  };

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
