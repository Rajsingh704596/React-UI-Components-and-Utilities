import axios from "axios";
import { useEffect, useState } from "react";
import "./pagination.css";

function Pagination2() {
    const[pageNo,setPageNo]=useState(1);
    const[data,setData]=useState([]);

    useEffect(()=>{
        axios.get(`https://picsum.photos/v2/list?page=${pageNo}&limit=5`)
             .then((res)=>setData(res.data))
    },[pageNo])

  return (
    <>
  
    <div className="image-container">
        {data?.map((pics,index)=>{
            return (
                <li key={index}>
                  <img src={pics.download_url} alt={index} className="image"/>
                </li>
            )
        })}
    </div>
      
      <PageButton pageNo={pageNo} setPageNo={setPageNo}/>
      
    </>
  )
}

export default Pagination2



const PageButton=({pageNo,setPageNo})=>{

  return(
    <>
     <div className="btn">

     { pageNo>1? (<div className="page-btn" onClick={()=>setPageNo((prev)=>prev-1)}>{"<"}</div>) : ("") }

      <div className="page-btn">{pageNo}</div>

      <div className="page-btn" onClick={()=>setPageNo((prev)=>prev+1)}>{">"}</div>

</div>
    </>
  )

}
