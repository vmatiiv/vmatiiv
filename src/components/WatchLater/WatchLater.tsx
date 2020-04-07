import React, { useState } from 'react'
import styled from 'styled-components'
const Item = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
`
function WatchLater({movies,remove}:any) {
//  style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}
//  style={{overflowY:"auto",height:"100vh"}}
const list = movies.map((x:any) => 
    <Item key={x.id}>
       <img src={x.imgPath} width="100px" height="100px" alt={x.title}/>
        <h1>{x.title}</h1>
        <button onClick={()=>remove(x.id)}>delete This</button>
    </Item> )
    return (
        <div style={{overflowY:"auto",height:"70vh",width:"100%"}}>
            {list}
        </div>
    )
}

export default WatchLater