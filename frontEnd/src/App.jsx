import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BlogSearch from "./components/blogSearch";
import "./App.css";
import { animated, useSpring } from "react-spring";
import SingleBlogModal from "./components/modals/singleBlogModal";
import NewBlogModal from "./components/modals/newBlogModal";
import ConfirmationModal from "./components/modals/confimationModal";
import { SelectedSingleBlogContext } from "./components/contexts/selectedBlogContext";
import { MessageContext } from "./components/contexts/messageContext";
import { ConfirmationTypeContext } from "./components/contexts/confirmationTypeContext";

function App() {
  const [selectedBlogSlug, setSelectedBlogSlug] = useState(null);
  const [message, setMessage] = useState("");
  const [confirmationType, setConfirmationType] = useState(1);

  let screenWidthInital = window.innerWidth;
  let screenHeigthInital = window.innerHeight;

  const [windowWidth, setWindowWidth] = useState(screenWidthInital);
  const [windowHeight, setWindowHeight] = useState(screenHeigthInital);

  window.addEventListener("resize", trackScreen);

  function trackScreen() {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }
  const [singleBlogYCoord, setSingleBlogYCoord] = useState(0);
  const [newBlogYCoord, setNewBlogYCoord] = useState(0);
  const [successYCoord, setSuccessYCoord] = useState(0);

  const moveSingleBlogModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${singleBlogYCoord}px,0)` },
  });

  const animateSingleBlogModal = () => {
    let blueSectionHeight = document.getElementsByClassName("viewBlog")[0]
      .clientHeight;

    if (singleBlogYCoord === 0) {
      setSingleBlogYCoord(-windowHeight / 2 - blueSectionHeight / 2);
    } else {
      setSingleBlogYCoord(0);
    }
  };

  const moveNewBlogModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${newBlogYCoord}px,0)` },
  });

  const animateNewBlogModal = () => {
    let blueSectionHeight = document.getElementsByClassName("newBlog")[0]
      .clientHeight;

    if (newBlogYCoord === 0) {
      setNewBlogYCoord(-windowHeight / 2 - blueSectionHeight / 2);
    } else {
      setNewBlogYCoord(0);
    }
  };

  const moveSucessModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${successYCoord}px,0)` },
  });

  const animateSuccessModal = () => {
    let blueSectionHeight = document.getElementsByClassName("successModal")[0]
      .clientHeight;

    if (successYCoord === 0) {
      setSuccessYCoord(-windowHeight / 2 - blueSectionHeight / 2);
    } else {
      setSuccessYCoord(0);
    }
  };

  return (
    <ConfirmationTypeContext.Provider value={{confirmationType, setConfirmationType}}>
      <MessageContext.Provider value={{ message, setMessage }}>
        <SelectedSingleBlogContext.Provider
          value={{ selectedBlogSlug, setSelectedBlogSlug }}
        >
          <div className="mainContainer">
            <BlogSearch
              animateSingleBlogModal={animateSingleBlogModal}
              animateNewBlogModal={animateNewBlogModal}
              animateSuccessModal={animateSuccessModal}
            />

            <animated.div className="viewBlog" style={moveSingleBlogModal}>
              <SingleBlogModal
                animateSingleBlogModal={animateSingleBlogModal}
                animateSuccessModal={animateSuccessModal}
              />
            </animated.div>

            <animated.div className="newBlog" style={moveNewBlogModal}>
              <NewBlogModal
                animateNewBlogModal={animateNewBlogModal}
                animateSuccessModal={animateSuccessModal}
              />
            </animated.div>

            <animated.div className="successModal" style={moveSucessModal}>
              <ConfirmationModal animateSuccessModal={animateSuccessModal} />
            </animated.div>
          </div>
        </SelectedSingleBlogContext.Provider>
      </MessageContext.Provider>
    </ConfirmationTypeContext.Provider>
  );
}

export default App;
