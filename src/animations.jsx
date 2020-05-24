import styled from 'styled-components'
import {animated} from 'react-spring'

export const AsideContant = styled(animated.div)`
    position:relative;
  height:100%;
  width:200%;
  display:flex;
  overflow:auto;
  z-index:123;
`;
export const MobileView = styled(animated.div)`
  display:flex;
  width:300vw;
`
export const Button = styled(animated.button)`
  position:relative;
  width:100%;
  height:100vh;
  max-height:100%;
  border-radius:20px;
  overflow: visible;
  padding:0;
  outline:none;
  border:none;
  transform-style: preserve-3d;
`

