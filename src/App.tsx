import React, {   useEffect, useState, useCallback } from 'react';
import WatchLater from './components/WatchLater'
import FiltersContainer from './components/Filters'
import MovieCardContainer from './components/MovieCard/MovieListContainer'
import {Route} from 'react-router-dom'
import { getGenresThunk} from './redux/reducers/filterReducer'
import { connect } from 'react-redux';

import styled, { css } from 'styled-components';
import TransHOC from './HOC/TransHOC'

import { CSSTransition, SwitchTransition } from 'react-transition-group';
const Navigation = styled.div`
  display:flex;
  padding:0.5rem;
  justify-content:space-around;
  align-items:center;
  background:linear-gradient(90deg, rgba(255,68,0,1) 0%, rgba(255,214,0,1) 100%);

`

const Wrapper = styled.div` 
  display:grid;
  position:relative;
  height:100vh;
  min-width:100%;
  grid-template-columns:1fr;
  grid-template-rows:auto 1fr;
  @media (min-width:${props => props.theme.media.md}){
    grid-template-columns:1fr 2fr;
    grid-template-rows:none;

  }

`
const Aside = styled.aside<{clear:boolean}>`
  position:relative;
  height:${props => props.clear ? "auto" : "100vh"};
  @media (min-width:${props => props.theme.media.md}){
      border-right: 1px solid black;
      height:auto;
      .main{
     display:none
   }
  }


`
const AsideContant = styled.div`
  position:relative;
  height:100%;
  overflow:auto;
  z-index:123;
`
const Main = styled.div`
  position:relative;
  height:100%;
  width:100%;
  display:flex;
  background-color: ${props => props.theme.colors.mainBackground};
  justify-content:center;
  align-items:center;
`


function App({getGenresThunk}:any) {
  const [clear,setClear] = useState(true);
  const [watchLaterPage,setWatchLaterPage] = useState(true)
  const [filters,setFilters] = useState(false)
  console.log(watchLaterPage);
  useEffect(()=>{
    console.log('effect')
    getGenresThunk()
  },[]);



  const handleFiltersShow = () =>{
    setFilters(true)
    setClear(false);
    setWatchLaterPage(false);
  }

  const handleWatchLaterShow = () => {
    setWatchLaterPage(true);
    setFilters(false)
    setClear(false);


  }

  return (
    <Wrapper>

          <Aside clear={clear}>
            <Navigation> 
              <h1 onClick={handleWatchLaterShow}>watch Later</h1>
              <h1 className="main" onClick={()=>setClear(true)}> main </h1>
              <h1 onClick={handleFiltersShow}>filters</h1>
            </Navigation>

             <AsideContant>
              <TransHOC visible={watchLaterPage} transform={100}>
                <WatchLater/>
              </TransHOC>

              <TransHOC visible={filters} transform={-100}>
                <FiltersContainer/>
              </TransHOC>
            </AsideContant>
          </Aside>
          
          <Main className="camon"> 
            <Route path="/" component={MovieCardContainer}/> 
          </Main>
           
    </Wrapper >
  );
}

export default connect(null,{getGenresThunk})(App)
