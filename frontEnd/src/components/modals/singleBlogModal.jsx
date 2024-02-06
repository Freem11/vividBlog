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
  const { animateSingleBlogModal, animateSuccessModal, singleBlogYCoord, setSingleBlogYCoord } = props;
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
    <div className="modalBodyContainer" >
    
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
      <div className="topSection" >
        <div className="topLineBox">
        <img
        src={`./pics/${selectedBlog.image}`}
        width={"100%"}
        style={{
          objectFit: "cover",
          marginTop: "-5%",
          marginLeft: "-10vw",
          zIndex: 0
        }}
      />
        <h3 className="headerTextShow">{selectedBlog.title}</h3>
        <div onClick={() => delteConfirm()} className="deleteBlogButton">
        <p className="deleteText">Delete</p>
        </div>
        </div>
        
        <p className="blogContentText">{selectedBlog.content}</p>
      </div>

      <div className="lowSection">
        <h4 className="tileText2">Other blogs you may like</h4>
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
