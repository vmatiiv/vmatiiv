import React, {   useEffect } from 'react';
import WatchLater from './components/WatchLater'
import FiltersContainer from './components/Filters'
import MovieCardContainer from './components/MovieCard/MovieListContainer'
import {Route} from 'react-router-dom'
import { getGenresThunk} from './redux/reducers/filterReducer'
import { connect } from 'react-redux';

import styled from 'styled-components';
import NavHOC from './HOC/NavHOC'

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

// const StyledApp = styled.div`
//   display:grid;
//   position:relative;
//   grid-template-columns: 1fr 2fr 1fr;
//   @media (min-width:502px){
//     grid-template-areas: 'later main  filters';
//   }
//   @media (max-width:500px) {
//     grid-template-columns:1fr;
//     grid-template-rows:1fr 1fr;
//   }
// `


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
    console.log('get genres')
  });

  return (
    <Wrapper onKeyDown={()=>{console.log('clicked')}}>

        <nav style={{display:"flex",justifyContent:"space-around",alignItems:"center", height:"5vh",backgroundColor:"red"}}>
        
          <NavHOC title={'watch later'} to={'/watch-later'}/>
          <NavHOC title={'filters'} to={'/filters'}/>
        </nav>

        <StyledApp className="something">
          <Main>  
            <Route path="/" component={MovieCardContainer}/>  
          </Main>

          {/* <Later > */}
            <Route path="/watch-later" component={WatchLater}/>
          {/* </Later>  */}
          {/* <Filters> */}
            <Route path="/filters" component = {FiltersContainer}/>
          {/* </Filters>  */}


        </StyledApp>
    </Wrapper >
  );
}

export default connect(null,{getGenresThunk})(App)
