// now here main logic use of Throttling , so user interact multiple time regularly but fun execute one time at specific delay , means 1 sec m user 10 time scroll kar de but scroll 1 time hi ho ga
// we have multiple functionality but here we useRef hook to perform this task
//*In Throttle case user first interaction pr fun. call lagti hai , last wali nhi lgti hai uss ek sec m 

// import { useEffect, useRef, useState } from "react"

// // custom hook fun use to take value and return throttle value
// export default function useThrottling(value, delay) {

//     const[throttleValue, setThrottleValue]=useState(value)

//     const lastExecuted = useRef(Date.now());
    

//     useEffect(() => {
//       const handler = setTimeout(() => {
//         const now = Date.now();
//         if (now - lastExecuted.current >= delay) {
//           setThrottleValue(value);
//           lastExecuted.current = now;
//         }
//       }, delay - (Date.now() - lastExecuted.current));
  
//       return () => clearTimeout(handler);
//     }, [value, delay]);

//   return throttleValue;
// }


