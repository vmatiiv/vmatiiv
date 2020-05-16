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