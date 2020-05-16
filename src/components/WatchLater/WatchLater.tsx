import React from 'react'
import styled from 'styled-components'
import Img from '../common/Img'
import {Navigation} from '../../styles'
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
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
  
const Later = styled.div`
  order:1;
  height:100%;
  width:50%;
  overflow-y:auto;
  background-color:white;
  @media (max-width:${props => props.theme.media.md}){
        background-color: ${props => props.theme.colors.mainBackground};
        width:100vw;
        position:relative;
        height:100vh;
   }
  
`
function WatchLater({setClear,movies,remove}:any) {
    const swipeRight = (id:number) => ({
        content: <ContentLeft><DeleteIcon/></ContentLeft>,

        action: ()=> {remove(id)},

    })
    const list = movies.map((x:any) => 
    <div key={x.id}>
        <SwipeableListItem  swipeStartThreshold={20} threshold={0.25} swipeRight={swipeRight(x.id)} >
            <ListItem >
                <div style={{display:"flex",alignItems:"center"}}>
                    <Img  src={x.poster_path}  alt={x.title} maxWidth={"100px"}/>
                    <h1 style={{paddingLeft:"1rem"}}>{x.title}</h1>

                </div>


            </ListItem>
        </SwipeableListItem>
    </div>
    )

    return (
            <Later>
                <Navigation right>
                    <ViewCarouselIcon onClick={()=>setClear("-100vw")}/>
                </Navigation>
                <SwipeableList >
                    {list}
                </SwipeableList>
            </Later>
    )
}

export default  WatchLater