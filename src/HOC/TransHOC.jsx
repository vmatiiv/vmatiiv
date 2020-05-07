import React from 'react'
import { Transition} from 'react-transition-group';
import styled from 'styled-components';

const Try = styled.div`
      transition:all ${props =>  props.duration}ms ease-in-out;
      /* opacity:0; */
      transform:translateX(${props => props.transform}%);
      height:95vh;
      width:100%;
      @media (max-width: 500px) {
          background: #fff;
          position:absolute;
          top:0;
          left:0;
      }
`

function TransHOC({children,transform}) {
    const duration = 3000;
    const windowScale = window.innerWidth  > 500 ? '40vw' : '100vw';

    const transitionStyles = {
        entering: { 
          opacity: 1,
          width: windowScale, 
          zIndex: 2,
          transform: "translateX(0)"},
        entered:  { 
          opacity: 1,
           width: windowScale,
           transform: "translateX(0)",
          zIndex:2 },
        exiting:  { opacity:1,zIndex:1},
        exited:  { opacity: 1,zIndex:1},
      };

    return (
        <Transition  timeout={duration}>
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