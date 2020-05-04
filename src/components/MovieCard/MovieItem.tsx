import React, {  useRef, useState } from 'react'
import Draggable, { DraggableEvent } from 'react-draggable';
import styled from 'styled-components'
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';

import MovieDescription from './MovieDescription';
import Img from '../common/Img';
import { Route, Link } from 'react-router-dom';
import { Swipeable, direction } from 'react-deck-swiper';


interface IMovieItem {
    id:number,
    title:string,
    poster_path:string,
    watchLater: any,
    remove: any,
    drag:boolean,
    // dragDissable:boolean,
    // setDragDissable:any,
    overview:any
}
const Wrapper = styled.div<{scrollable:boolean}>`
  position:relative;
  touch-action:pan-y ;
  overflow-x:hidden;
  font-size: 1rem;
  cursor:'pointer';
  overflow-y:${props => props.scrollable ? 'scroll' : 'hidden'};
  height:95vh;
  margin: 0 auto;
  min-width: 360px;
  max-width: 600px;
  background-color:#000;
  color:white;
  .image{
    position:relative;
    height:${props => props.scrollable ? '80%' : '100%'};
  }
  
`

const MovieItem = ({id,title,drag,remove,overview,watchLater,poster_path}:IMovieItem) => {
    const [dragDissable,setDragDissable] = useState(drag);
    const wrapper = useRef<HTMLDivElement>(document.createElement('div'))
    wrapper.current.scroll(0,0);

    const onStop = (e:DraggableEvent,ui:any) => {
      if(ui.x > 150){
        addToLater();
      }else if (ui.x<-150){
        remove(id)

      } 
    }

    const addToLater = () => {
      watchLater({id,title,overview,poster_path})
      remove(id)
    }
    const dragEvents = {
        onStop,
    }
    const onClick = () => { 
      console.log('clicked') 
      !dragDissable ? setDragDissable(true) : dragEnableClick();
    }

    const dragEnableClick = () => {
      wrapper.current.scroll(0,0);
      setDragDissable(false)
    }
    const handleOnSwipe = (swipeDirection:any) => {
      console.log(swipeDirection)
      if (swipeDirection === direction.RIGHT) {
        addToLater();
        return;
      }
  
      if (swipeDirection === direction.LEFT) {
    // handle left swipe
    remove(id)

        return;
      }
    }
    const swipeConfig = {
      swipeLeft:{
        content:<div style={{position:"absolute",right:0}}>gnuda</div>,
        action: () => addToLater()
      },
      swipeRight:{
        content:<div style={{position:"absolute",left:0}}>tuda</div>,
        action: () => remove(id),
      },
      actionAnimation:"REMOVE"
    }
    return (
      <SwipeableList >
          <SwipeableListItem  {...swipeConfig} blockSwipe={dragDissable}>
            <Wrapper ref={wrapper}  onClick={onClick} scrollable={dragDissable} >
                <Img src={poster_path} alt={title}/>
                <MovieDescription/> 
            </Wrapper>
             {/* {dragDissable && 
             <div style={{position:"absolute",left:"1rem",width:"100%",height:"20px",bottom:"1rem"}}>
               <button onClick={addToLater}> click</button>
               </div>} */}
          </SwipeableListItem>
        
        </SwipeableList>
      )
}

export default MovieItem
