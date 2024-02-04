import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BlogSearch from "./components/blogSearch";
import "./App.css";
import { animated, useSpring } from "react-spring";
import SingleBlogModal from "./components/modals/singleBlogModal";
import NewBlogModal from "./components/modals/newBlogModal";
import { SelectedSingleBlogContext } from "./components/contexts/selectedBlogContext";

function App() {
  const [selectedBlogSlug, setSelectedBlogSlug] = useState(null);

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

  const moveSingleBlogModal = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to: { transform: `translate3d(0,${singleBlogYCoord}px,0)` },
  });

  const animateSingleBlogModal = () => {
    let blueSectionHeight = document.getElementsByClassName("viewBlog")[0].clientHeight;

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
    let blueSectionHeight = document.getElementsByClassName("newBlog")[0].clientHeight;

    if (newBlogYCoord === 0) {
      setNewBlogYCoord(-windowHeight / 2 - blueSectionHeight / 2);
    } else {
      setNewBlogYCoord(0);
    }
  };
  

  return (
    <SelectedSingleBlogContext.Provider
      value={{ selectedBlogSlug, setSelectedBlogSlug }}
    >
      <div className="mainContainer">
        <BlogSearch
          animateSingleBlogModal={animateSingleBlogModal}
          animateNewBlogModal={animateNewBlogModal}
        />

        <animated.div className="viewBlog" style={moveSingleBlogModal}>
          <SingleBlogModal animateSingleBlogModal={animateSingleBlogModal} />
        </animated.div>

        <animated.div className="newBlog" style={moveNewBlogModal}>
          <NewBlogModal animateNewBlogModal={animateNewBlogModal} />
        </animated.div>
      </div>
    </SelectedSingleBlogContext.Provider>
  );
}

export default App;
