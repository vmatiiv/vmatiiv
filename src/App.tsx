import React, {   useEffect } from 'react';
import WatchLater from './components/WatchLater'
import FiltersContainer from './components/Filters'
import MovieCardContainer from './components/MovieCard/MovieListContainer'
import {Route} from 'react-router-dom'
import { getGenresThunk} from './redux/reducers/filterReducer'
import { connect } from 'react-redux';

import styled from 'styled-components';
import NavHOC from './HOC/NavHOC'
import MovieDescription from './components/MovieCard/MovieDescription';

const Wrapper = styled.div` 
  width:100vw;
  height:100vh;
  margin:0;
  padding:0;
  overflow:hidden;
  box-sizing:border-box;
`
const StyledApp = styled.div`
  display:flex;
  position:relative;

`
const Navigation = styled.div`
  display:flex;
  justify-content:space-around;
  align-items:center;
  height:5vh;
  background-color:black;
`
const Main = styled.div`
  order:2;
  flex-grow:2;
  grid-area: main;
  width:100%;
  @media (max-width:500px){
    z-index:1;
  }
`

function App({getGenresThunk}:any) {

  useEffect(()=>{
    getGenresThunk()
  });

  return (
    <Wrapper onKeyDown={()=>{console.log('clicked')}}>

        <Navigation> 
          <NavHOC title={'watch later'} to={'/watch-later'}/>
          <NavHOC title={'filters'} to={'/filters'}/>
        </Navigation>

        <StyledApp className="something">
          <Main>  
              <Route path="/description" component={MovieDescription}/>
              <Route path="/"  component={MovieCardContainer}/>
          </Main>
            <Route path="/watch-later" component={WatchLater}/>
            <Route path="/filters" component = {FiltersContainer}/>
        </StyledApp>

    </Wrapper >
  );
}

export default connect(null,{getGenresThunk})(App)
