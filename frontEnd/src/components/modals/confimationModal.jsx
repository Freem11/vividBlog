import React from "react";
import { useContext, useEffect, useState } from "react";
import "./singleBlogModal.css";
import { MessageContext } from "../contexts/messageContext";

function ConfirmationModal(props) {
  const { animateSuccessModal } = props;
  const { message, setMessage } = useContext(MessageContext);
  
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
