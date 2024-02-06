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
    setSelectedBlogSlug(blogInfo);

    if(singleBlogYCoord === undefined){
      animateSingleBlogModal();
    }
  
  };

  // if(selectedBlogSlug){

  // }

  let trimmed = blogInfo.published_at.substring(0,10)
  
  return (
    <div className="tile" onClick={() => setupSingleBlog()} style={{backgroundImage: `url(./pics/${blogInfo.image})`,backgroundPositionY: "-0%",  backgroundSize: "cover", resize: "both"}}>
       {/* <img
        src={`./pics/${blogInfo.image}`}
        width={"100vw"}
        height={"80vh"}
        style={{
          objectFit: "cover",
        }}
      /> */}
      {/* <div className="tileTopRow"> */}
        <p className="tileText">{blogInfo.title}</p>
      {/* </div> */}
      {/* <p className="dateText">Posted: {trimmed}</p> */}
    </div>
  );
}

export default BlogTile;
