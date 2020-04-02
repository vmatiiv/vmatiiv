import React, { Suspense, useState, useEffect } from 'react';
import Draggable from 'react-draggable'
import WatchLater from './components/WatchLater'
import FiltersContainer from './components/Filters'
import MovieCardContainer from './components/MovieCard/MovieListContainer'

import { getGenresThunk} from './redux/reducers/movieReducer'
import { connect } from 'react-redux';
import { getFilters } from './selectors';
import { Route } from 'react-router-dom';

import styled from 'styled-components';

const StyledApp = styled.div` 
  width:100vw;
  height:100vh;
  overflow:hidden;
`

function App({filters,setFiltersAC,getGenresThunk,getMovieThunk}:any) {
  useEffect(()=>{
    getGenresThunk()
  },[]);

  return (

    <StyledApp >
      <div>
      <Route path="/" exact component={MovieCardContainer}/>

      </div>
      <div>
        <Route path="/watch-later" component={WatchLater}/>
        <Route path="/filters" component={FiltersContainer}/>
      </div>
    </StyledApp >
  );
}


const mapStateToProps = (store:any) => ({
  filters:getFilters(store)
}) 

export default connect(mapStateToProps,{getGenresThunk})(App)
