import React from 'react'

function WatchLater({movies,remove}:any) {
//  style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}
//  style={{overflowY:"auto",height:"100vh"}}
const list = movies.map((x:any,i:number) => 
<div key={i}>
    <img src={x.imgPath} width="100px" height="100px" alt={x.title}/>
    <h1>{x.title}</h1>
    <button onClick={()=>remove(x.id)}>x</button>
</div> )
    return (
        <div>
            {list}
        </div>
    )
}

export default WatchLater
