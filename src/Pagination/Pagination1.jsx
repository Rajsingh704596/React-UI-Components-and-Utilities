import { useState } from "react"

function Pagination1() {

    const [pageNo,setPageNo]=useState(1);


    const handleClick=(data)=>{ 
        if(data==="minus")setPageNo((prev)=>prev-1)
        if(data==="plus")setPageNo((prev)=>prev+1)
       
    }

  return (
    <>
     <button disabled={pageNo===1?true:false} onClick={()=>handleClick("minus")}>{"<"}</button> 
     {pageNo}
     <button disabled={pageNo===10?true:false}onClick={()=>handleClick("plus")}>{">"}</button>
    </>
  )
}

export default Pagination1
