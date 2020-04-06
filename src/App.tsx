import React, {  useState, useEffect } from 'react';
import WatchLater from './components/WatchLater'
import FiltersContainer from './components/Filters'
import MovieCardContainer from './components/MovieCard/MovieListContainer'

import { getGenresThunk} from './redux/reducers/movieReducer'
import { connect } from 'react-redux';

import styled from 'styled-components';

import TransHOC from './HOC/TransHOC';


const Wrapper = styled.div` 
  width:100vw;
  height:100vh;
  overflow:hidden;
`

const StyledApp = styled.div`
  display:flex;
  position:relative;
  justify-content:center;
`

function App({getGenresThunk,getMovieThunk}:any) {
  const [watchLaterPage,setWatchLaterPage] = useState(false)
  const [filters,setDisplayFilters] = useState(false)

  useEffect(()=>{
    getGenresThunk()
  },[]);

  const handleFiltersShow = () =>{
    setDisplayFilters(!filters)
    setWatchLaterPage(false);
  }

  const handleWatchLaterShow = () => {
    setWatchLaterPage(!watchLaterPage);
    setDisplayFilters(false)

  }
  return (
    <Wrapper >
        <h1 onClick={handleWatchLaterShow}>watch Later</h1>
        <h1 onClick={handleFiltersShow}>filters</h1>
      <StyledApp>

        <TransHOC visible={watchLaterPage} transform={100}>
          <WatchLater />  
        </TransHOC>

          <MovieCardContainer/>
        
        <TransHOC visible={filters} transform={-100}>
          <FiltersContainer setDisplayFilters={setDisplayFilters}/>
        </TransHOC>


      </StyledApp>
    </Wrapper >
  );
}

export default connect(null,{getGenresThunk})(App)
