import React from 'react'
import "./blogTile.css"

function BlogTile(props) {
    const { blogInfo, animateSingleBlogModal } = props

    return (
        <div className="tile" onClick={() => animateSingleBlogModal()}>
            <p className="tileText">{blogInfo.title}</p>
            <p className="tileText">Posted: {blogInfo.published_at}</p>
        </div>
    )
}

export default BlogTile
