import React from 'react'
import { connect } from 'react-redux'
import {getGenres, getFilters, getBlockList} from '../../selectors'
import {getMoviesWithFiltersThunk} from '../../redux/reducers/movieReducer'
import {setFiltersAC} from '../../redux/reducers/filterReducer'
import Filters from './Filters'



function FiltersContainer({blocklist,setClear,filters,setFiltersAC,genres,getMoviesWithFiltersThunk}:any) {
    return (  <>
        { !!genres ? <Filters setClear={setClear} blocklist={blocklist} filters={filters}  getMovieThunk={getMoviesWithFiltersThunk} setFilters={setFiltersAC}  genres={genres}/> : <h1>loading</h1>}
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

    getMoviesWithFiltersThunk
}

export default connect(mapStateToProps,mapDispatchToProps)(FiltersContainer)
