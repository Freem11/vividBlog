import React from "react";
import { useContext, useEffect, useState } from "react";
import "./confimationModal.css";
import "./submissionSection.css";
import "./modal.css";
import "../buttons.css"
import { MessageContext } from "../contexts/messageContext";
import { SelectedSingleBlogContext } from "../contexts/selectedBlogContext";
import { ConfirmationTypeContext } from "../contexts/confirmationTypeContext";
import { getToday } from "../../helpers/dateFormatingHelper";
import { softDeleteBlog } from "../../../fetchRequests/blogFetches";

function ConfirmationModal(props) {
  const { animateSuccessModal, setSingleBlogYCoord, setNewBlogYCoord } = props;
  const { message, setMessage } = useContext(MessageContext);
  const { selectedBlogSlug } = useContext(SelectedSingleBlogContext);
  const { confirmationType, setConfirmationType } = useContext(
    ConfirmationTypeContext
  );
  
  const softRemoveBlog = async () => {
    let deleted = new Date(Date.now()); //toString()
    let formattedDate = getToday(deleted);

    let dataPackage = {
      slug: selectedBlogSlug.slug,
      updated_at: formattedDate,
      deleted_at: formattedDate,
    };

    let removedBlog = await softDeleteBlog(selectedBlogSlug.slug, dataPackage);
    if (removedBlog) {
      setMessage(`${selectedBlogSlug.title} was sucessfully Deleted`);
      setConfirmationType(1);
    } else {
      setConfirmationType(1);
      setMessage("There was an error deleting your blog, please try again");
    }
  };

  const cleanupModals = async () => {
    animateSuccessModal();
    setSingleBlogYCoord(0);
    setConfirmationType(1);
    if (message === "Your Blog is still incomplete! \n Please make sure to have a Title, Image and your Content in place before submitting"){

    } else {
      setNewBlogYCoord(0);
    }

  };

  return (
    <div className="modalBodyContainer confirmationModal">
        <h3 className="tileTextConfirm">{message}</h3>

      {confirmationType === 1 ? (
        <div className="submitSection">
          <div className="button" onClick={() => cleanupModals()}>
            <p>Ok</p>
          </div>
        </div>
      ) : (
        <div className="submitSection two-buttons">
          <div className="button" onClick={() => softRemoveBlog()}>
            <p>Confirm</p>
          </div>
          <div className="button cancel" onClick={() => animateSuccessModal()}>
            <p>Cancel</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmationModal;
