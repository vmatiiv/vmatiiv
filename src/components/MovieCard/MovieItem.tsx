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
    nextImage:string,
    backdrop_path:string,
    // dragDissable:boolean,
    // setDragDissable:any,
    overview:any
}
const Wrapper = styled.div<{scrollable:boolean}>`
  position:relative;
  /* touch-action:pan-y ; */
  /* overflow-x:hidden; */
  cursor: pointer;
  overflow:hidden;
  font-size: 1rem;
  /* overflow-y:${props => props.scrollable ? 'scroll' : 'hidden'}; */
  height:95vh;
  margin: 0 auto;
  min-width: 360px;
  max-width: 600px;
  color:white;

`
const Button = styled.button`
  position:relative;
  height:95vh;
  margin:0;
  padding:0;
  outline:none;
  border:none;
`
const MovieItem = ({id,title,drag,remove,overview,watchLater,nextImage,backdrop_path,poster_path}:IMovieItem) => {
    const [dragDissable,setDragDissable] = useState(drag);



    const addToLater = () => {
      watchLater({id,title,overview,poster_path})
      remove(id)
    }

    const onClick = () => { 
      console.log('clicked') 
      !dragDissable ? setDragDissable(true) : dragEnableClick();
    }

    const dragEnableClick = () => {
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

    // const swipeConfig = {
    //   swipeLeft:{
    //     content:<Left></Left>,
    //     action: () => remove(id)
    //   },
    //   swipeRight:{
    //     content:<Right></Right>,
    //     action: () => addToLater()
    //   },
    //   threshold:0.25
    // }
    
    return (
      <Wrapper scrollable={dragDissable} >

      <Swipeable  onSwipe={handleOnSwipe} >
        <Button>
                    <Link onClick={onClick} to="/description">info</Link>
                    <Img src={poster_path} alt={title}/>
        </Button>
        
        </Swipeable>

        {/* <div style={{position:"absolute",height:"95vh",top:0,left:0,zIndex:-1}}>
                      <Img src={backdrop_path} alt={title}/>
                    </div> */}

          </Wrapper>



      ) 
}

export default MovieItem
