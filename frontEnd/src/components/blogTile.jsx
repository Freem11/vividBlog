import React from 'react'
import { useContext } from "react";
import "./blogTile.css"
import { SelectedSingleBlogContext } from "../components/contexts/selectedBlogContext";


function BlogTile(props) {
    const { blogInfo, animateSingleBlogModal } = props
    const { selectedBlogSlug, setSelectedBlogSlug } = useContext(SelectedSingleBlogContext);

    const setupSingleBlog = () => {
        setSelectedBlogSlug(blogInfo.slug)
        animateSingleBlogModal()  
    }

    return (
        <div className="tile" onClick={() => setupSingleBlog()}>
            <p className="tileText">{blogInfo.title}</p>
            <p className="tileText">Posted: {blogInfo.published_at}</p>
        </div>
    )
}

export default BlogTile
