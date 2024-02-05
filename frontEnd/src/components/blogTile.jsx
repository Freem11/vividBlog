import React from "react";
import { useContext } from "react";
import "./blogTile.css";
import { SelectedSingleBlogContext } from "../components/contexts/selectedBlogContext";

function BlogTile(props) {
  const { blogInfo, animateSingleBlogModal, singleBlogYCoord, setSingleBlogYCoord } = props;
  const { selectedBlogSlug, setSelectedBlogSlug } = useContext(
    SelectedSingleBlogContext
  );

  const setupSingleBlog = () => {
    setSelectedBlogSlug(blogInfo.slug);

    if(singleBlogYCoord === undefined){
      animateSingleBlogModal();
    }
  
  };

  // if(selectedBlogSlug){

  // }

  let trimmed = blogInfo.published_at.substring(0,10)
  
  return (
    <div className="tile" onClick={() => setupSingleBlog()}>
      {/* <div className="tileTopRow"> */}
        <p className="tileText">{blogInfo.title}</p>
      {/* </div> */}
      <p className="dateText">Posted: {trimmed}</p>
    </div>
  );
}

export default BlogTile;
