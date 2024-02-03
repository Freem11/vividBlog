import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BlogSearch from "./components/blogSearch";
import "./App.css";
function App() {
  return (
    <div className="mainConatiner">
      <BlogSearch />
    </div>
  );
}

export default App;
