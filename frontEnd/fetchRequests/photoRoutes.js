const getPhoto = async () => {
    try {
      const response = await fetch(`http://localhost:5000/photo/upload`, {
        method: "GET",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      console.log("what", data)
      return data;
    } catch (err) {
      console.log("error", err);
    }
  };
  
  const addPhoto = async (dataPackage) => {
    console.log("route", dataPackage)
    try {
      const response = await fetch(`http://localhost:5000/photo/upload`, {
        method: "POST",
        body: dataPackage,
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("error", err);
    }
  };

  export { addPhoto, getPhoto };
