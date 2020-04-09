import React, {  useState, useEffect } from 'react';
import WatchLater from './components/WatchLater'
import FiltersContainer from './components/Filters'
import MovieCardContainer from './components/MovieCard/MovieListContainer'
import {Route,Link} from 'react-router-dom'
import { getGenresThunk} from './redux/reducers/filterReducer'
import { connect } from 'react-redux';

import styled from 'styled-components';
import NavHOC from './HOC/NavHOC'
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

function App({getGenresThunk}:any) {
  const [watchLaterPage,setWatchLaterPage] = useState(true)
  const [filters,setDisplayFilters] = useState(true)
  debugger
  useEffect(()=>{
    getGenresThunk()
  },[]);

  const handleFiltersShow = () =>{
    setDisplayFilters(!filters)
    setWatchLaterPage(true)
  }

  const handleWatchLaterShow = () => {
    setWatchLaterPage(!watchLaterPage);
    setDisplayFilters(true)
  }
  return (
    <Wrapper >
        {/* <h1 onClick={handleWatchLaterShow}>watch Later</h1> */}
        <nav style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
          {/* <Link  to={location =>  `${location.pathname === ('/') || location.pathname == ('/filters')? '/watch-later': '/'}` }  > watch later</Link> */}
          {/* <Link  to={location =>  `${location.pathname === '/' || location.pathname == ('/watch-later') ? '/filters': '/'}` } >filters</Link> */}
          <NavHOC title={} to={}/>
        </nav>
        {/* <h1 onClick={handleFiltersShow}>filters</h1> */}
      <StyledApp>

      <Route path="/watch-later" component={WatchLater}/>  

      <Route path="/" component={MovieCardContainer}/>  
      <Route path="/filters" >
        <FiltersContainer/>
      </Route>  

        {/* <TransHOC visible={watchLaterPage} transform={100}>
          <WatchLater />  
        </TransHOC>

          <MovieCardContainer/>
        
        <TransHOC visible={filters} transform={-100}>
          <FiltersContainer setDisplayFilters={setDisplayFilters}/>
        </TransHOC> */}


      </StyledApp>
    </Wrapper >
  );
}

export default connect(null,{getGenresThunk})(App)
