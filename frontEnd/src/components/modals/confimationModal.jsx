import React from "react";
import { useContext, useEffect, useState } from "react";
import "./singleBlogModal.css";
import { MessageContext } from "../contexts/messageContext";
import { SelectedSingleBlogContext } from "../contexts/selectedBlogContext";
import { getToday } from "../../helpers/dateFormatingHelper";

function ConfirmationModal(props) {
  const { animateSuccessModal } = props;
  const { message, setMessage } = useContext(MessageContext);
  const { selectedBlogSlug } = useContext(SelectedSingleBlogContext);

  const softDeleteBlog = async () => {

    let slug = blogInfo.slug
    let deleted = new Date(Date.now()); //toString()
    let formattedDate = getToday(deleted);

    let dataPackage = {
      slug: selectedBlogSlug,
      updated_at: formattedDate,
      deleted_at: formattedDate,
    };

    try {
      const response = await fetch(`http://localhost:5000/deleted${slug}`, {
        method: "POST",
        body: JSON.stringify(dataPackage),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      if (data) {
        setMessage("Your New Blog was sucessfully Deleted");
        animateSuccessModal();
      } else {
        animateSuccessModal();
        setMessage("There was an error deleting your blog, please try again");
      }
    } catch (err) {
      animateSuccessModal();
      setMessage("There was an error deleting your blog, please try again");
      console.log("error", err);
    }
    
    
  };
  
  return (
    <div className="modalBodyContainer">
      <div className="topSection">
        <h3 className="tileText">{message}</h3>
      </div>

      <div className="submitSection">
        <div className="submitBtn" onClick={() => animateSuccessModal()}>
          <p>Ok</p>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
