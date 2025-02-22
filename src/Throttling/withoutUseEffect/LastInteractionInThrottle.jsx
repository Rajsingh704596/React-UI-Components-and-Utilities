// we know Throttle first interaction take in specific delay time , but here we take last interaction of user 

import { useRef, useState } from "react";

// Custom hook for throttling with last interaction
 function useThrottling(value, delay) {
  // State to store the throttled value
  const [throttleValue, setThrottleValue] = useState(value);

  // Ref to store the timestamp of the last execution
  const lastExecutedRef = useRef(Date.now());

  // Ref to store the ID of the setTimeout
  const timeoutRef = useRef(null);

  // Ref to store the latest value of `value`
  const latestValueRef = useRef(value);

  // Update the latest value whenever `value` changes
  latestValueRef.current = value;

  // Throttle function
  const throttle = () => {
    const now = Date.now(); // Current timestamp
    const timeSinceLastExecution = now - lastExecutedRef.current; // Time since last execution

    // If the delay has passed, update the throttled value with the latest value
    if (timeSinceLastExecution >= delay) {
      setThrottleValue(latestValueRef.current); // Update throttled value
      lastExecutedRef.current = now; // Update last executed timestamp
    } else {
      // If the delay hasn't passed, clear the previous timeout (if any)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Schedule a new timeout to update the throttled value after the remaining delay
      timeoutRef.current = setTimeout(() => {
        setThrottleValue(latestValueRef.current); // Update throttled value
        lastExecutedRef.current = Date.now(); // Update last executed timestamp
      }, delay - timeSinceLastExecution);
    }
  };

  // Call the throttle function whenever `value` changes
  throttle();

  // Return the throttled value
  return throttleValue;
}



export default function LastInteractionInThrottle() {
    const [scrollY, setScrollY] = useState(0);
    const throttledScrollY = useThrottling(scrollY, 1000); // Throttle to 1 second
  
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return (
      <div style={{ height: "200vh" }}>
        <div style={{ position: "fixed", top: 0 }}>
          <h1>Throttling with Last Interaction</h1>
          <p>Normal ScrollY: {scrollY}</p>
          <p>Throttled ScrollY: {throttledScrollY}</p>
        </div>
      </div>
    );
  }

