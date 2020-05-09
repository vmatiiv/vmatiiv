import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Img from '../common/Img';
import { Redirect, Route } from 'react-router-dom';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Loader from '../common/Loader';
// import {Swipeable,direction} from 'react-deck-swiper'
 import {Swipeable,direction} from '../common/index'

import { CSSTransition } from 'react-transition-group';
import MovieDescription from './MovieDescription';
interface IMovieItem {
    id:number,
    title:string,
    poster_path:string,
    watchLater: any,
    remove: any,
    nextImage:string,
    backdrop_path:string,
    overview:any,
    loading:boolean
}


const DescriptionAnimation = css`
.page-enter {
  opacity: 0;
  bottom:-100%;
}

.page-enter-active {
  opacity: 1;
  bottom:0;
  transition: all 300ms ;
}

.page-exit {
  opacity: 1;
  bottom:0;

}

.page-exit-active {
  opacity: 0;
  bottom:100%;
  transition: all 600ms;
}
`

// const Wrapper = styled.div`
//   position:absolute;
//   left:0;
//   top:0;
//   overflow:hidden;
//   border-radius:20px;
//   font-size: 1rem;
//   max-width: 360;
//   height: 667px;
//   max-height: 95vh;
//   margin: 0 auto;
//   box-shadow: 3px 2px 32px 4px rgba(0,0,0,0.2);

//   color:white;
//   .description{
//     position:absolute;
//     bottom:0;
//     left:0;
//   }
//   ${DescriptionAnimation}
// `
const Wrapper = styled.div`
  position:absolute;
  top:0;
  left:0;
  border-radius:20px;
  width:100%;
  height:100%;
  overflow:visible;
`

const Button = styled.button`
  position:relative;
  width:100%;
  height:100%;
  border-radius:20px;
  overflow:hidden;
  background-color:transparent;
  box-shadow: 3px 2px 32px 4px rgba(0,0,0,0.2);
  margin:0;
  padding:0;
  outline:none;
  border:none;
  .info{
    position:absolute;
    bottom:1rem;
    right:1rem;
    background-color:pink;
    transform:scale(2);
  }

  .sw{
    overflow:visible;
  }
  ${DescriptionAnimation}
   /* .description{
     position:absolute;
     bottom:0;
     left:0;
   } */
`
const MovieItem = ({id,title,remove,overview,watchLater,nextImage,backdrop_path,poster_path,loading}:IMovieItem) => {
  const [dragDissable,setDragDissable] = useState(false)
    
    useEffect(()=>{ 
      setDragDissable(false)
    })
    const addToLater = () => {
      watchLater({id,title,overview,poster_path})
      remove(id)
    }

    const onClick = () => { 
       setDragDissable(true) 

    }

    const handleOnSwipe = (swipeDirection:any) => {
      if (swipeDirection === direction.RIGHT) {
        addToLater();
        return;
      }
      if (swipeDirection === direction.LEFT) {
        remove(id)
        return;
      }
    }

    return (

      <Wrapper  >
         {dragDissable && <Redirect to="/description"/>}
         {/* {loading && <Loader/>} */}
        < >
          <Swipeable  onSwipe={handleOnSwipe} >
              <Button>
                  <Img src={poster_path} alt={title} maxWidth={"360px"}/>
                  <InfoOutlinedIcon className="info" onClick={onClick}/>
              </Button>         
          </Swipeable>

      <Route path="/description">
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={300}
                  classNames="page"
                  unmountOnExit
                >
                    <MovieDescription/>

                 </CSSTransition>
              )}
              </Route> 
        </> 

       </Wrapper>



      ) 
}

export default MovieItem
