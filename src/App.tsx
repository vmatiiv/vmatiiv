import React, { Suspense, useState, useEffect } from 'react';
import Draggable from 'react-draggable'
import WatchLater from './components/WatchLater'
import Filters from './components/Filters'
import {movieDiscover,getGenres} from './api'

function App() {
  const [watchLaterPage,setWatchLaterPage] = useState(false);
  const [filterPage,setFilterPage] = useState(false)
  const [filters,setFilters] = useState({});
  const [genres,setGenres] = useState([]);

  useEffect(()=>{
    fetchMovies()

  },[filters])
  useEffect(()=>{
    fetchGenres();
  },[])

  const fetchMovies = async () => {
    const response = await movieDiscover(1,filters);
    console.log(response.data);
  }
  const fetchGenres = async () => {
    const response = await getGenres();
    setGenres(response.data.genres)
    // return response.data.genres
}
  return (

    <>

    <h1 onClick={()=>setWatchLaterPage(!watchLaterPage)}>watchList</h1>
    <h1 onClick={()=>setFilterPage(!filterPage)}>Filters</h1>

    {watchLaterPage && <WatchLater/>}
    {filterPage && <Filters filters={filters} setFilters={setFilters} genres={genres}/>}
    </>
  );
}

export default App;
