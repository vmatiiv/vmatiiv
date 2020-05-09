import React from 'react'
import styled from 'styled-components'
import Img from '../common/Img'
const Item = styled.div`
  display:grid;
  grid-template-columns:1fr 2fr;
  margin: 0.5rem auto;
`
const Later = styled.div`
  order:1;
  height:100%;
  width:100%;
  overflow-y:auto;
  background-color:white;
  @media (max-width:500px){
      position:absolute;
      top:0;
      left:0;
      width:100vw;
  } 
`

function WatchLater({movies,remove}:any) {


    const list = movies.map((x:any) => 
            <Item key={x.id}>
                <div>
                    <Img  src={x.poster_path}  alt={x.title}/>
                </div>
                <div style={{margin:"0 auto"}}>
                    <h1>{x.title}</h1>
                    <button onClick={()=>remove(x.id)}>delete</button>
                </div>


            </Item>
    )
    return (
            <Later>
                {list}
            </Later>

    )
}

export default  WatchLater