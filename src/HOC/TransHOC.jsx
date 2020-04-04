import React from 'react'
import { Transition} from 'react-transition-group';
import styled from 'styled-components';

const Try = styled.div`


      transition:all ${props =>  props.duration}ms ease-in-out;
      opacity:0;
      width:10px;
      transform:translateX(${props => props.transform}%);
      height:100vh;
      @media (max-width: 500px) {
          background: #fff;
          position:absolute;
          top:0;
          left:0;
          z-index:2;
      }
`


function TransHOC({visible,children,transform}) {
    const duration = 300;
    const windowScale = window.innerWidth  > 500 ? '40vw' : '100vw';

    const transitionStyles = {
        entering: { 
          opacity: 1,
          width: windowScale, 
          transform: "translateX(0)"},
        entered:  { 
          opacity: 1,
           width: windowScale,
           transform: "translateX(0)"},
        exiting:  { opacity:0,},
        exited:  { opacity: 0,},
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