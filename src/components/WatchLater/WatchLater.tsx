import React from 'react'
import styled from 'styled-components'
import Img from '../common/Img'
import DeleteIcon from '@material-ui/icons/Delete';
import {SwipeableList, SwipeableListItem} from '@sandstreamdev/react-swipeable-list'

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
    h1{
        padding-left:1rem;
    }
`
  
const ContentLeft = styled.div`
    background-color: #d11a2a;
    display:flex;
    align-items:center;
    padding-left:2rem;
    position:absolute;
    color: white;
    height:150px;
    width: 100%;
    svg{
        transform:scale(2.5);
    }

`
  

function WatchLater({movies,remove}:any) {

    const swipeRight = (id:number) => ({
        content: <ContentLeft><DeleteIcon/></ContentLeft>,
        action: ()=> {remove(id)},
    })

    const list = movies.map((x:any) => 
        <div key={x.id}>
            <SwipeableListItem  swipeStartThreshold={20} threshold={0.25} swipeRight={swipeRight(x.id)} >
                <ListItem >
                    <Img  src={x.poster_path}  alt={x.title} maxWidth={"100px"}/>
                    <h1>{x.title}</h1>
                </ListItem>
            </SwipeableListItem>
        </div>
    )

    return (
            <>
                <SwipeableList >
                    {list}
                </SwipeableList>
            </>
    )
}

export default  WatchLater