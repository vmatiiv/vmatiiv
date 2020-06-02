import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Img from '../common/Img';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {useSwipeable} from 'react-swipeable';
import MovieDescription from './MovieDescription';
import { useSpring } from 'react-spring';
import {Button} from '../../animations';

interface IMovieItem {
    id:number,
    title:string,
    poster_path:string,
    watchLater: any,
    remove: any,
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

const About = styled.div<{flip:boolean}>`

   background-color:rgba(0,0,0,0.6);
   width:100%;
   position:absolute;
   text-align: start;
   color:white;
   bottom:0;
   left:0;
   height:10%;
   display:${props => props.flip ? 'none' : 'flex'};
   justify-content:space-between;
   .info{
      padding-right:2rem;
   }
   padding-left:1rem;
   align-items:center;
`
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
const MovieItem = ({id,title,remove,overview,watchLater,poster_path,loading,original_title}:IMovieItem) => {
  const [flip,setFlip] = useState(false);
  const but = useRef(document.createElement('button'))

    const addToLater = () => {
      watchLater({id,title,overview,poster_path})
      remove(id)
    }

    const onClick = () => {
      setFlip(!flip) 
    }



    const trans = useSpring({
      transform: `rotateY(${!flip ? '0' : '180'}deg) `,
      config:{
        duration:600
      }
    })
    const swiping = (e:any) => {
      const initial = e.initial[0]
      const transform = e.deltaX < 0 ? e.absX : -e.absX;
      but.current.style.transform = `translateX(${transform}px) rotate(${transform/10}deg)`
    }
    const swiped = (e:any) =>{

      if(e.deltaX < -200) {
        addToLater()
      }
      else if(e.deltaX > 200) {

        remove(id)
      }
      else but.current.style.transform = `translateX(${0}px) rotate(${0}deg)` 
   
    }
    const config ={
      delta: 10,                             // min distance(px) before a swipe starts
      preventDefaultTouchmoveEvent: false,   // preventDefault on touchmove, *See Details*
      trackTouch: true,                      // track touch input
      trackMouse: true,                     // track mouse input
      rotationAngle: 0,                      // set a rotation angle
    }
    const handlers =  useSwipeable({ 
        onSwiping:swiping,
        onSwiped: swiped,
         ...config 
      }) 


    return ( 

      <Wrapper  >
              <Button ref={but} style={trans} >
                <Front {...handlers}>
                  <Img src={poster_path} alt={title} />
                    <About flip={flip}>
                      <h1>{title}</h1>
                      <InfoOutlinedIcon className="info" onClick={onClick}/>
                    </About>
                  </Front>
                  <Back >
                    <MovieDescription  flipBack={setFlip}/>
                  </Back>
              </Button>
       </Wrapper>



      ) 
}

export default React.memo(MovieItem)
