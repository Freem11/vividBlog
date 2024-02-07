import React from "react";
import { useContext } from "react";
import "./blogTile.css";
import { SelectedSingleBlogContext } from "../components/contexts/selectedBlogContext";

function BlogTile(props) {
  const { blogInfo, animateSingleBlogModal, singleBlogYCoord } = props;
  const { setSelectedBlogSlug } = useContext(SelectedSingleBlogContext);

  const setupSingleBlog = () => {
    setSelectedBlogSlug(blogInfo);

    if (singleBlogYCoord === undefined) {
      animateSingleBlogModal();
    }
  };

  let trimmed = blogInfo.published_at.substring(0, 10);

  return (
    <div
      className="tile"
      onClick={() => setupSingleBlog()}
      style={{
        backgroundImage: `url(./pics/${blogInfo.image})`,
        backgroundPositionY: "-0%",
        backgroundSize: "cover",
        resize: "both",
      }}
    >
      <p className="tileText">{blogInfo.title}</p>
    </div>
  );
}

export default BlogTile;
