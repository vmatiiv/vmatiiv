import React from 'react'
import styled from 'styled-components'
import Img from '../common/Img'
import {SwipeableList, SwipeableListItem} from '@sandstreamdev/react-swipeable-list'
const Item = styled.div`
    display:flex;
    flex-wrap:nowrap;
`



const ListItem = styled.div`
    position:relative;
    border-bottom: 1px solid #c4c4c4;
    height: 100%;
    overflow:hidden;
    width: 100%;
    display: flex;
    align-items: center;
    background-color:white;
    user-select: none;
    cursor: pointer;
`
  
const ContentLeft = styled.div`
    background-color: red;
    position:absolute;
    color: white;
    height:150px;
    width: 100%;

`
  
const ContentRight = styled.div`
    position:absolute;
    background-color: green;
    height: 100%;
    width: 100%;
    justify-content: flex-end;
`

const Later = styled.div`
  order:1;
  height:100%;
  min-width:100%;
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

    const swipeRight = (id:number) => ({
        content: <ContentLeft>Revealed content during swipe</ContentLeft>,
        action: ()=> {remove(id)}

    })
    const list = movies.map((x:any) => 
    <div style={{position:"relative"}}>
        <SwipeableListItem  swipeRight={swipeRight(x.id)} key={x.id}>
            <ListItem >
                <div>
                    <Img  src={x.poster_path}  alt={x.title} maxWidth={"100px"}/>
                </div>
                <div style={{margin:"0 auto"}}>
                    <h1>{x.title}</h1>
                    <button onClick={()=>remove(x.id)}>delete</button>
                </div>


            </ListItem>
        </SwipeableListItem>
    </div>
    )
    return (
            <Later>
                <SwipeableList>
                    {list}
                </SwipeableList>
            </Later>

    )
}

export default  WatchLater