
import { useRef, useState } from "react";

//customHook to apply throttle 
function useThrottling(value, delay) {
  const [throttleValue, setThrottleValue] = useState(value);
  const lastExecutedRef = useRef(Date.now()); // Last executed timestamp
  const timeoutRef = useRef(null); // To store the timeout ID

  // Throttle function
  const throttle = (newValue) => {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecutedRef.current;

    if (timeSinceLastExecution >= delay) {
      // If delay has passed, update the value
      setThrottleValue(newValue);
      lastExecutedRef.current = now;
    } else {
      // If delay hasn't passed, schedule the update
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Clear previous timeout
      }

      timeoutRef.current = setTimeout(() => {
        setThrottleValue(newValue);
        lastExecutedRef.current = Date.now();
      }, delay - timeSinceLastExecution);
    }
  };

  // Call the throttle function whenever `value` changes
  throttle(value);

  return throttleValue;
}

// Main component
export default function ThrottlingWithoutUseEffectExample() {
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottling(scrollY, 1000); // Throttle to 1 second

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div style={{ height: "200vh" }}>
      <div style={{ position: "fixed", top: 0 }}>
        <h1>Throttling Example</h1>
        <p>Normal ScrollY: {scrollY}</p>
        <p>Throttled ScrollY: {throttledScrollY}</p>
      </div>
    </div>
  );
}