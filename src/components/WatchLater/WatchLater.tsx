import React from 'react'

function WatchLater({movies,remove}:any) {
const list = movies.map((x:any) => 
<div>
    <img src={x.imgPath} width="100px" height="100px" alt={x.title}/>
    <h1>{x.title}</h1>
    <button onClick={()=>remove(x.id)}>x</button>
</div> )
    return (
        <div style={{overflowY:"scroll",height:"100vh",backgroundColor:"green"}}>
            {list}
        </div>
    )
}

export default WatchLater
