import React from 'react'
import { connect } from 'react-redux'
import {getGenres, getFilters, getBlockList} from '../../selectors'
import {setPageAC,getMovieThunk} from '../../redux/reducers/movieReducer'
import {setFiltersAC} from '../../redux/reducers/filterReducer'
import Filters from './Filters'



function FiltersContainer({blocklist,filters,setFiltersAC,genres,getMovieThunk}:any) {
    return (  <>
        { !!genres ? <Filters blocklist={blocklist} filters={filters}  getMovieThunk={getMovieThunk} setFilters={setFiltersAC}  genres={genres}/> : <h1>loading</h1>}
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
    setPageAC,
    getMovieThunk
}

export default connect(mapStateToProps,mapDispatchToProps)(FiltersContainer)
