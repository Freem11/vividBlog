const getSixBlog = async (limits) => {
  try {
    const response = await fetch(`http://localhost:5000/?upper=${limits.upper}&lower=${limits.lower}&text=${limits.text}`, {
      method: "GET"
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const getSingleBlog = async (selectedBlogSlug) => {
  try {
    const response = await fetch(`http://localhost:5000/${selectedBlogSlug}`, {
      method: "GET"
    });
    const data = await response.json();
    return data[0];
  } catch (err) {
    console.log("error", err);
  }
};

const getFourBlogs = async () => {
  try {
    const response = await fetch(`http://localhost:5000/related`, {
      method: "GET"
    });
    const data = await response.json();
    console.log("fetch", data)
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const createNewBlog = async (dataPackage) => {
  try {
    const response = await fetch(`http://localhost:5000/create`, {
      method: "POST",
      body: JSON.stringify(dataPackage),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const softDeleteBlog = async (selectedBlogSlug, dataPackage) => {
  try {
    const response = await fetch(
      `http://localhost:5000/deleted${selectedBlogSlug}`,
      {
        method: "POST",
        body: JSON.stringify(dataPackage),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

export { getSixBlog, getSingleBlog, getFourBlogs, createNewBlog, softDeleteBlog };
