import React from "react";
import { useContext, useEffect, useState } from "react";
import "./singleBlogModal.css";
import { MessageContext } from "../contexts/messageContext";
import { SelectedSingleBlogContext } from "../contexts/selectedBlogContext";
import { ConfirmationTypeContext } from "../contexts/confirmationTypeContext";
import { getToday } from "../../helpers/dateFormatingHelper";

function ConfirmationModal(props) {
  const { animateSuccessModal, setSingleBlogYCoord, setNewBlogYCoord } = props;
  const { message, setMessage } = useContext(MessageContext);
  const { selectedBlogSlug } = useContext(SelectedSingleBlogContext);
  const { confirmationType, setConfirmationType } = useContext(ConfirmationTypeContext);

  const softDeleteBlog = async () => {
    let deleted = new Date(Date.now()); //toString()
    let formattedDate = getToday(deleted);

    let dataPackage = {
      slug: selectedBlogSlug,
      updated_at: formattedDate,
      deleted_at: formattedDate,
    };

    try {
      const response = await fetch(`http://localhost:5000/deleted${selectedBlogSlug}`, {
        method: "POST",
        body: JSON.stringify(dataPackage),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      if (data) {
        setMessage("Your New Blog was sucessfully Deleted");
        setConfirmationType(1);
      } else {
        setConfirmationType(1);
        setMessage("There was an error deleting your blog, please try again");
      }
    } catch (err) {
      setConfirmationType(1);
      setMessage("There was an error deleting your blog, please try again");
      console.log("error", err);
    }
  };

  const cleanupModals = async () => {
    animateSuccessModal()
    setSingleBlogYCoord(0)
    setNewBlogYCoord(0)
  }

  return (
    <div className="modalBodyContainer">
      <div className="topSection">
        <h3 className="tileText">{message}</h3>
      </div>

      {confirmationType === 1 ? (
        <div className="submitSection">
          <div className="submitBtn" onClick={() => cleanupModals()}>
            <p>Ok</p>
          </div>
        </div>
      ) : (
        <div className="submitSection">
          <div className="submitBtn" onClick={() => softDeleteBlog()}>
            <p>Confirm</p>
          </div>
          <div className="submitBtn" onClick={() => animateSuccessModal()}>
            <p>Cancel</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmationModal;
