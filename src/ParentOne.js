import React, { useCallback, useState } from 'react'
import ChildOne from './ChildOne'


const ParentOne = () => {
    const [count, setCount] = useState(0);
    const [table, setTable] = useState(2)
    const updateName = useCallback(()=>{
        console.log("updating")
    },[table])
  return (
    <div>
        <h1>{count}</h1>
        <button onClick={()=>setCount(count+1)}>+</button>
        <ChildOne updateName = {updateName} table={table}/>
        <button onClick={()=> setTable(table+2)}>table</button>
    </div>
  )
}

export default ParentOne