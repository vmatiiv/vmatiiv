import React, { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import Img from '../common/Img';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

 import {Swipeable,direction} from '../common/index'

import MovieDescription from './MovieDescription';
import { useSpring } from 'react-spring';
import {Button} from '../../animations';
interface IMovieItem {
    id:number,
    title:string,
    poster_path:string,
    watchLater: any,
    remove: any,
    nextMovie:any,
    overview:any,
    loading:boolean,
    original_title:string
}


const Wrapper = styled.div`
  position:absolute;
  background-color:transparent;
  top:0;
  left:0;
  border-radius:20px;
  width:100%;
  height:100%;
  perspective: 1000px;
  overflow:visible;
`

<<<<<<< HEAD
=======
const Button = styled.button`
  position:relative;
  width:100%;
  height:100%;
  border-radius:20px;
  overflow:hidden auto;
  /* background-color:transparent; */
  /* box-shadow: 3px 2px 32px 4px rgba(0,0,0,0.2); */
  /* margin:0; */
  padding:0;
  outline:none;
  border:none;
  img{
    min-width:360px;
  }

  ${DescriptionAnimation}

`
>>>>>>> a9cc5e1ba9c1f2c12649b699dc43c939b768a611
const About = styled.div`
   background-color:rgba(0,0,0,0.6);
   width:100%;
   position:absolute;
   text-align: start;
   color:white;
   bottom:0;
   left:0;
   height:10%;
   display:flex;
   justify-content:space-between;
   .info{
      padding-right:2rem;
   }
   padding-left:1rem;
   align-items:center;
`
<<<<<<< HEAD
const Front = styled.div`
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius:20px;
`
const Back = styled.div`
  transform: rotateY(180deg);
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  overflow:auto;
  &::-webkit-scrollbar{
        display:none;
  }
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius:20px;

`
const BackImage = styled.button`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  border-radius:20px;
  overflow: hidden;
  padding:0;
  border:none;
  outline:none;
  z-index:-12;
  div.wrap{
    width:100%;
    height:100%;
  }
`
const MovieItem = ({id,title,remove,overview,watchLater,nextMovie,poster_path,loading,original_title}:IMovieItem) => {
  const [flip,setFlip] = useState(false);
=======
const MovieItem = ({id,title,remove,overview,watchLater,nextImage,backdrop_path,poster_path,loading,original_title}:IMovieItem) => {
  const [dragDissable,setDragDissable] = useState(false);
  const scroll = useRef(document.createElement("button"));
  // scroll.current.scrollTo(0,0);
    useEffect(()=>{ 
      setDragDissable(false)
    })
>>>>>>> a9cc5e1ba9c1f2c12649b699dc43c939b768a611

    const addToLater = () => {
      watchLater({id,title,overview,poster_path})
      remove(id)
    }

    const onClick = () => {
<<<<<<< HEAD
      setFlip(!flip) 
=======
       scroll.current.scrollTo(0,scroll.current.clientHeight);
       setDragDissable(true) 


>>>>>>> a9cc5e1ba9c1f2c12649b699dc43c939b768a611
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

    const trans = useSpring({
      transform: `rotateY(${!flip? '0' : '180'}deg)`,
      config:{
        duration:600
      }
    })


    return (

      <Wrapper  >
<<<<<<< HEAD
         <Swipeable  onSwipe={handleOnSwipe} >
              <Button  style={trans}>
                <Front>
                  <Img src={poster_path} alt={title} />
                    <About>
                      <h1>{title}</h1>
                      <InfoOutlinedIcon className="info" onClick={onClick}/>
                    </About>
                  </Front>
                  <Back >
                    <MovieDescription  flipBack={setFlip}/>
                  </Back>
              </Button>
          </Swipeable> 
          <BackImage>
            <div className="wrap">
              <Img src={nextMovie.image} alt={nextMovie.title} />
              <About>
                <h1>{nextMovie.title}</h1>
                <InfoOutlinedIcon className="info" onClick={onClick}/>
              </About>
            </div>
          </BackImage> 

       
=======
         <Swipeable   onSwipe={handleOnSwipe} >
              <Button ref={scroll}>
                  <Img src={poster_path} alt={title} />
                  <About>
                    <h1>{original_title}</h1>
                    <InfoOutlinedIcon className="info" onClick={onClick}/>
                  </About>
                  <MovieDescription/>
              </Button>
          </Swipeable>


>>>>>>> a9cc5e1ba9c1f2c12649b699dc43c939b768a611
       </Wrapper>



      ) 
}

export default React.memo(MovieItem)
