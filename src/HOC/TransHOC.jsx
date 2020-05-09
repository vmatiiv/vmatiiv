import React from 'react'
import { Transition} from 'react-transition-group';
import styled from 'styled-components';

const Try = styled.div`
  /* position:relative; */
  position:absolute;
  top:0;
  left:0;
  opacity:0;
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

    return (
        <Transition in={visible} timeout={duration}>
        {(state) => (
            <Try transform={transform} duration={duration} 
            style={{...transitionStyles[state]}} 
>
                {children}
            </Try>
        )}
   </Transition>
    )
}
export default TransHOC