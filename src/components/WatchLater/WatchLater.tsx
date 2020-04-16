import React from 'react'
import styled from 'styled-components'
const Item = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
`
const Later = styled.div`
  order:1;
  height:95vh;
  width:100%;
  overflow-y:auto;
  grid-area: later;
  z-index:2;
  background-color:white;
  @media (max-width:500px){
      position:absolute;
      top:0;
      left:0;
  }
`
function WatchLater({movies,remove}:any) {

const list = movies.map((x:any) => 
    <Item key={x.id}>
       <img src={x.imgPath} width="100px" height="100px" alt={x.title}/>
        <h1>{x.title}</h1>
        <button onClick={()=>remove(x.id)}>delete This</button>
    </Item> )
    return (
        <Later>
            {list}
        </Later>
    )
}

export default WatchLater