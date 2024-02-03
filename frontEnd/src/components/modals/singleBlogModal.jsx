import React from "react";
import xButton from "../../images/close.png";
import "./singleBlogModal.css";

function SingleBlogModal(props) {
    const { animateSingleBlogModal } = props
  return (
    <div className="modalBodyContainer">
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
    </div>
  );
}

export default SingleBlogModal;
