import { useState, useEffect,useContext } from 'react'

import MainCont from '../../context/mainCont'

function Example(){
    const [count,updateCOunt]= useState({number:0});

    useEffect(()=>{
        alert(1)
    },[count])
    const val= useContext(MainCont);
    const s= useContext(MainCont);
    return (
      <div>
          {val}
          {s}
          
        <p>You clicked {count.number} times</p>
        <button onClick={()=>updateCOunt({number:count.number+1})}>
          Click Mah
        </button>
      </div>
    );
  }

  
  export default Example;