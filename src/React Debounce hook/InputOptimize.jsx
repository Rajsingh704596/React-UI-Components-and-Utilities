
import { useState } from "react"
import useDebounce from "./useDebounce";


function InputOptimize() {
   
    const [search,setSearch] = useState("");

   const debounceValue= useDebounce(search,2000);     //here we call custom hook 

  return (
    <>
      <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      <hr />
       <h1>Normal Type:{search}</h1>
       <hr />
       <h1>Debounce :{debounceValue}</h1>
    </>
  )
}

export default InputOptimize
