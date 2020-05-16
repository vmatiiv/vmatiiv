import React from 'react'
import { Transition} from 'react-transition-group';
import styled from 'styled-components';
import {useSpring,animated} from 'react-spring'
const Try = styled.div`
  /* position:relative; */
  position:absolute;
  top:0;
  left:0;
  opacity:0;
  width:100%;
  transition: all ${props => props.duration}ms ease-in;
 @media (max-width: 780px) {
     background: #fff;
     position:absolute;
     height:100%;
     width:100vw;
     top:0;
     left:0;
     z-index:1234;
 }
`





function TransHOC({children,visible,transform}) {
    const duration = 300;

    const transitionStyles = {
        entering: { 
          opacity: 1,
          left:"-90vw"
        },
        entered:  { 
          opacity: 1,
          left:0
        },
          // transition: "all 300ms "},
        exiting:  { 
          opacity: 0,
          left:0
          // transition: "all 600ms"
        },
        exited:  {  
          opacity: 0,
          left:"-90vw"
        },
      };
      const prop = useSpring({
        from:{
          left:0
        },
        to:{
          left:"50%"
        },
        config:{
          duration:3000
        }
      })
    return (
//         <Transition in={visible} timeout={duration}>
//         {(state) => (
//             <Try transform={transform} duration={duration} 
//             style={{...transitionStyles[state]}} 
// >
//                 {children}
//             </Try>
//         )}
//    </Transition>
      <animated.div style={{...prop}}>
        {children}
      </animated.div>
    )
}
export default TransHOC