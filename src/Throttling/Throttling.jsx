//! Throttling - Execute the fun. at regular interval, even if the event keep firing (e.g user click button continuously but button click 1 time at specific delay time like 1 sec ,means 6 sec m 6 time event call, when user stop event fun not call)
//# useful for events that happen frequently and need to be controlled. e.g scroll , resize (window)

import { useEffect, useState } from "react"
import useThrottling from "./useThrottling";

export const Throttling=()=>{

    const[scrollValue, setScrollValue]=useState(0);  // store value of scrollY

    // custom hook to get throttleValue , pass as a argument value , delay
    const throttledValue = useThrottling(scrollValue, 1000);    //1 sec specific time fix

    // Component Mount scroll event listener execute
    useEffect(()=>{

        const handleScroll=()=>{
           setScrollValue(window.scrollY);    
        }

        document.addEventListener("scroll",handleScroll);
        // cleanup fun
        return()=>{
          document.removeEventListener("scroll",handleScroll);
        }

    },[])
    return(
        <div style={{height:"1000rem"}}>
        <div style={{
            position:"fixed",
            top :"0",
        }}>
            <h1>Throttling in Action</h1>
            <hr />
            <h2>Normal window Scroll Event fire : {Math.floor(scrollValue)}</h2>
            <hr />
            {/* <h2>Throttling Use Now Scroll Event Fire : {throttledValue}</h2> */}   {/*value get in decimal form */}
            <h2>Throttling Use Now Scroll Event Fire : {Math.floor(throttledValue)}</h2>
        </div> 
        </div>
    )
}