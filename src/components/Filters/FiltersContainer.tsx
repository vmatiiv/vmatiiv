import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getGenres, getFilters, getBlockList} from '../../selectors'
import {getMoviesWithFiltersThunk} from '../../redux/reducers/movieReducer'
import {setFiltersAC, getGenresThunk} from '../../redux/reducers/filterReducer'
import Filters from './Filters'
import Loader from '../common/Loader'



function FiltersContainer({getGenresThunk,blocklist,setClear,filters,setFiltersAC,genres,getMoviesWithFiltersThunk}:any) {
    useEffect(()=>{
        getGenresThunk()
      },[genres]);
   return (  <>
        { !!genres ? <Filters setClear={setClear} blocklist={blocklist} filters={filters}  getMovieThunk={getMoviesWithFiltersThunk} setFilters={setFiltersAC}  genres={genres}/> : <Loader/>}
        </>
    )
}

const mapStateToProps = (store:any) => ({
    genres: getGenres(store),
    filters: getFilters(store),
    blocklist: getBlockList(store)
})
const mapDispatchToProps = {
    setFiltersAC,
    getMoviesWithFiltersThunk,
    getGenresThunk
}

export default connect(mapStateToProps,mapDispatchToProps)(FiltersContainer)
