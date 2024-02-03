import React from "react";
import { useContext, useEffect, useState } from "react";
import xButton from "../../images/close.png";
import "./singleBlogModal.css";
import { SelectedSingleBlogContext } from "../contexts/selectedBlogContext";

function SingleBlogModal(props) {
    const { animateSingleBlogModal } = props
    const { selectedBlogSlug, setSelectedBlogSlug } = useContext(SelectedSingleBlogContext);
    const [selectedBlog, setSelectedBlog] = useState([]);
    console.log("passing", selectedBlogSlug)

    const getSingleBlogBySlug = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${selectedBlogSlug}`, {
          method: "GET",
          headers: { "content-type": "application/json" },
        });
        const data = await response.json();
        setSelectedBlog(data)
  
      } catch (err) {
        console.log("error", err);
      }
    };

    useEffect(() => {
      getSingleBlogBySlug();
    }, [selectedBlogSlug]);

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
          <div>
            <h3>{selectedBlog[0].title}</h3>
        <p>{selectedBlog[0].content}</p>
          </div>

    </div>
  );
}

export default SingleBlogModal;
