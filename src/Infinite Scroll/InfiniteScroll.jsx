import { useState, useEffect, useRef } from "react";

export const InfiniteScroll = () => {
  const [images, setImages] = useState([]); // Stores fetched images
  const [page, setPage] = useState(1); // Tracks current page for pagination
  const containerRef = useRef(null); // Ref for the scroll container

  // Function to fetch images
  const fetchImages = async (page) => {
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=3`
      );
      const data = await response.json(); // Convert response to JSON
      setImages((prevImages) => [...prevImages, ...data]); // Append new images
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Fetch images when the page changes
  useEffect(() => {
    fetchImages(page);
  }, [page]);

  // Add scroll event listener to the container
  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      // Check if user has scrolled near the bottom
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 100
      ) {
        setPage((prevPage) => prevPage + 1); // Load next page
      }
    };

    container.addEventListener("scroll", handleScroll); // Attach scroll event
    return () => container.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "scroll",
        padding: "20px",
      }}
    >
      <h1>Image Scroll</h1>
      <div>
        {images.map((image) => (
          <div key={image.id} style={{ marginBottom: "20px" }}>
            <img
              src={image.download_url}
              alt={`Image ${image.id}`}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

