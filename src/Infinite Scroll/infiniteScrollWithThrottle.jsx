import { useState, useEffect } from "react";

export const InfiniteScrollWithThrottle = () => {
  // State to store fetched images
  const [images, setImages] = useState([]);
  // State to track the current page number
  const [page, setPage] = useState(1);
  // State to handle loading state
  const [loading, setLoading] = useState(false);
  // State to check if more data is available
  const [hasMore, setHasMore] = useState(true);

  // Function to fetch images from the API
  const fetchImages = async () => {
    if (!hasMore) return; // Stop if no more data is available

    setLoading(true); // Set loading to true
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=3`
      );
      const data = await response.json();
      
      if (data.length === 0) {
        setHasMore(false); // No more data available
      } else {
        setImages((prev) => [...prev, ...data]); // Append new images
        setPage((prev) => prev + 1); // Increment page number
      }
    } catch (error) {
      console.error("Error:", error); // Handle errors
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Fetch first set of images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Handle scroll event to load more images
  useEffect(() => {
    let isThrottled = false; // Throttle flag to limit API calls
    
    const handleScroll = () => {
      if (isThrottled || loading || !hasMore) return; // Skip if already loading or no more data
      isThrottled = true; // Set throttle flag
      
      setTimeout(() => {
        const scrollPos = window.innerHeight + document.documentElement.scrollTop;
        const pageHeight = document.documentElement.offsetHeight;
        
        // Check if user has scrolled near the bottom
        if (scrollPos >= pageHeight - 200) {
          fetchImages(); // Fetch more images
        }
        isThrottled = false; // Reset throttle flag
      }, 500); // Throttle for 500ms
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, [loading, hasMore]);

  return (
    <div>
      <h1>Optimized Infinite Scroll</h1>
      <div>
        {images.map((image, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <img
              src={image.download_url}
              alt={`Image ${image.id}`}
              style={{ width: "300px", height: "200px", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>} {/* Show loading indicator */}
      {!hasMore && <p style={{textAlign: "center"}}>No more images!</p>} {/* Show end message */}
    </div>
  );
};