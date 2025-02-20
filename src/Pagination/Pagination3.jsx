import axios from "axios";
import { useEffect, useState } from "react";
import "./pagination.css";

function Pagination3() {
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

export default Pagination3;




const PageButton=({pageNo,setPageNo})=>{

  // Array Create using Array.from method, where length 3 provide , and fun pass where value is underscore(b/c no value), sa-th hi filter method se 0 se above value hi show ho 
  const prevThreeNumArr =Array.from({length:3},(_,index)=> pageNo-1-index).filter((value)=>value>0).reverse();       
  //suppose 5 no page(index=0) 5-1-0 =>4 , (index=1) 5-1-1 => 3,(index=2) 5-1-2=>2 ,        // page no 5 hone pr ph-le k 3 no bhi mil ja-ye 

 // console.log(prevThreeNumArr);   // [4,3,2]  , so we use reverse method
 // console.log(prevThreeNumArr.reverse());    //[2,3,4]

  //Next 3no Array
  // const nextThreeNumArr= Array.from({length:3},(_,index)=> pageNo+1+index)    //[6,7,8]
  const nextFourNumArr= Array.from({length:4},(_,index)=> pageNo+index);
 // console.log(nextFourNumArr);     //[5,6,7,8]

  // now combined array using spread operator
 // console.log([...prevThreeNumArr,...nextFourNumArr])  //[2,3,4,5,6,7,8]
   const paginationArr= [...prevThreeNumArr,...nextFourNumArr];



  return(
    <>
     <div className="btn">

     { pageNo>1? (<div className="page-btn" onClick={()=>setPageNo((prev)=>prev-1)}>{"<"}</div>) : ("") }

     {
      paginationArr?.map((value)=>{
        return <div className={value==pageNo?"page-btn active":"page-btn"} key={value} onClick={()=> setPageNo(value)}> {value} </div>
      })
     }

      <div className="page-btn" onClick={()=>setPageNo((prev)=>prev+1)}>{">"}</div>

    </div>
    </>
  )

}
