import React, { Suspense, useState, useEffect } from 'react';
import Draggable from 'react-draggable'
import WatchLater from './components/WatchLater'
import FiltersContainer from './components/Filters'
import MovieCardContainer from './components/MovieCard/MovieListContainer'

import { getGenresThunk} from './redux/reducers/movieReducer'
import { connect } from 'react-redux';
import { getFilters } from './selectors';
import { Route } from 'react-router-dom';

function App({filters,setFiltersAC,getGenresThunk,getMovieThunk}:any) {
  useEffect(()=>{
    getGenresThunk()
  },[]);

  return (

    <>
      <div>
      <Route path="/" exact component={MovieCardContainer}/>
        <Route path="/watch-later" component={WatchLater}/>
        <Route path="/filters" component={FiltersContainer}/>
      </div>
    </>
  );
}


const mapStateToProps = (store:any) => ({
  filters:getFilters(store)
}) 

export default connect(mapStateToProps,{getGenresThunk})(App)
