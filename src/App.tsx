import React, {   useEffect } from 'react';
import WatchLater from './components/WatchLater'
import FiltersContainer from './components/Filters'
import MovieCardContainer from './components/MovieCard/MovieListContainer'
import {Route} from 'react-router-dom'
import { getGenresThunk} from './redux/reducers/filterReducer'
import { connect } from 'react-redux';

import styled, { css } from 'styled-components';
import NavHOC from './HOC/NavHOC'
import { CSSTransition } from 'react-transition-group';
const Navigation = styled.div`
  display:flex;
  justify-content:space-around;
  align-items:center;
  height:5vh;
  background-color:${props => props.theme.colors.onyx};
`
const Wrapper = styled.div` 
  width:100vw;
  height:100vh;

  margin:0;
  padding:0;
  overflow:hidden;
  box-sizing:border-box;


`
const Left = css`
  .left {
  position:relative;
  order:1;
  z-index:2;
}

.left-enter {
  opacity: 0;
  left:-95vw;
}

.left-enter-active {
  opacity: 1;
  left:0;
  transition: all 300ms ;
}

.left-exit {
  opacity: 1;
  transform: scale(1);
  left:0;

}

.left-exit-active {
  opacity: 0;
  left:-170vw;
  transition: all 600ms;
}
`
const Right = css`
  .right {
  position:relative;
  order:3;
  z-index:2;
}

.right-enter {
  opacity: 0;
  right:-95vw;
}

.right-enter-active {
  opacity: 1;
  right:0;
  transition: all 300ms ;
}

.right-exit {
  opacity: 1;
  transform: scale(1);
  right:0;

}

.right-exit-active {
  opacity: 0;
  right:-170vw;
  transition: all 600ms;
}
`
const StyledApp = styled.div`
  display:flex;
  position:relative;
  ${Right}
  ${Left}
`

const Main = styled.div`
  order:2;
  position:relative;
  height:95vh;
  width:100%;
  display:flex;
  flex-grow:2;
  justify-content:center;
  align-items:center;
  @media (max-width:500px){
    z-index:1;
  }
`
const Aside = styled.aside`
  order: 1;
  width:100%;
`
function App({getGenresThunk}:any) {

  useEffect(()=>{
    getGenresThunk()
  });


  return (
    <Wrapper onKeyDown={()=>{console.log('clicked')}}>
        <Aside>
          <Navigation> 
            <NavHOC title={'watch later'} to={'/watch-later'}/>
            <NavHOC title={'filters'} to={'/filters'}/>
          </Navigation>
        </Aside>
        <StyledApp className="something">
          <Main className="camon"> 
            <Route path="/" component={MovieCardContainer}/> 
          </Main>

              <Route path="/watch-later" >
              {({ match }) => (
                <CSSTransition in={match != null} timeout={300} classNames="left" unmountOnExit>
                  <div className="left">
                    <WatchLater/>
                  </div>
                </CSSTransition>
                )}
              </Route>

              <Route path="/filters" >
              {({ match }) => (
                <CSSTransition in={match != null} timeout={300} classNames="right" unmountOnExit>
                  <div className="right">
                    <FiltersContainer/>
                  </div>
                </CSSTransition>
                )}
              </Route>
        </StyledApp>
 
    </Wrapper >
  );
}

export default connect(null,{getGenresThunk})(App)
