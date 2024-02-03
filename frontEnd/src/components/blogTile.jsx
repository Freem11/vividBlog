import React from 'react'
import "./blogTile.css"

function BlogTile(blogInfo) {
    return (
        <div className="tile">
            <p className="tileText">{blogInfo.blogInfo.title}</p>
            <p className="tileText">Posted: {blogInfo.blogInfo.published_at}</p>
        </div>
    )
}

export default BlogTile
