import React from "react";
import { useState } from "react";
import { useEffect } from "react";
// import { pullBlogs } from "../axiosCalls/blogAxiosCalls";

function App() {
  const [blogList, setBlogList] = useState([]);

  const pullAllBlogs = async () => {
    try {
      // const response = fetch("http://localhost:5000/blogs", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json"},
      //   body: JSON.stringify(body)
      // })
      const response = await fetch("http://localhost:5000/");
      const data = await response.json();
      setBlogList(data);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    pullAllBlogs();
  }, []);

  return (
    <div>
      {blogList &&
        blogList.map((blog) => {
          return (
            <div key={blog.id}>
              <p>Title: {blog.title}</p>
              <p>Word Salad: {blog.content}</p>
              <p>Posted: {blog.published_at}</p>
            </div>
          );
        })}
    </div>
  );
}

export default App;
