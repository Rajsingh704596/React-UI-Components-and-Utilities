//Debounce - It wait until the event stop firing for a special delay then fun execute , ( fun trigger after a pause of user interaction)
//{useCase e.g input field, Search, keypress events}

import { useCallback,  useState } from "react";
// import { useEffect } from "react";

//! note - custom hook start with use and naming convenance is camel case      , but component is pascal case

// here we use custom hook useDebounce , value return after delay
export default function useDebounce(value,delay) {

    const [debounceValue,setDebounceValue]= useState(value);


    //^ 1 way using useEffect , debounce perform
//   useEffect(()=>{
//     const timerId =setTimeout(()=>{
//                     setDebounceValue(value);
//                 },delay);
//           // cleanup fun
//           return()=>{
//             clearTimeout(timerId);
//           }   
//     },[value,delay])

  // ^ 2nd way here we call generic debounceFun(traditional fun) without useEffect

  const debouncedFun= useCallback(
    debounce((value)=>setDebounceValue(value), delay),  // Passing the setDebouncedValue callback and delay
    [delay]);  // Recreate the debounced function only when delay changes
    // so that's why we need to memoize this debounce fun so it call only one time , // before use useCallback hook, issue is both fun call 2 times , or debounce input type give slowly appear one word at a time          
     // but after useCallback debounce(value) call every time that we need,debounce type appear instant after delay          
    debouncedFun(value);            // Call the debounced function directly  on every value change to trigger debounce behavior         
  return debounceValue; 
}

//without cleanUp fun it's work but after 2sec. delay all input type appear slowly 
//but we use cleanUp fun so old delay(timer 1) clean and for new type new delay (timer 2)run , also full input type appear fast.


//^ 2 way using Generic function debounce logic(plain js) define-

//here callback , delay pass . and debounce version return with some delay. and if user execute multiple input so timer help to remove previous instance or take only recent one
function debounce(callback, delay){             //higher order fun. create which return debounce fun which we memoize above
    let timerId;                                   
    return function debouncedFun(...args){
        if(timerId){
            clearTimeout(timerId);         //for clear previous timeoutif a new event is triggered  using closure   (closure inner fun know the value(timerId) of outer fun)
        }
    // Set a new timeout for the callback
       timerId= setTimeout(()=>{
            callback(...args);     // Invoke the callback with the latest arguments (value)
    },delay);
  }
}
        