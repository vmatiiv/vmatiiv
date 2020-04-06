import React from 'react'
import { connect } from 'react-redux'
import {getGenres, getFilters, getPage, getBlockList} from '../../selectors'
import {setPageAC,getMovieThunk} from '../../redux/reducers/movieReducer'
import {setFiltersAC} from '../../redux/reducers/filterReducer'
import Filters from './Filters'



function FiltersContainer({blocklist,filters,page,setFiltersAC,setDisplayFilters,setPageAC,genres,getMovieThunk}:any) {
    return (  <>
        { !!genres ? <Filters blocklist={blocklist} display={setDisplayFilters} filters={filters} page={page} setPage={setPageAC} getMovieThunk={getMovieThunk} setFilters={setFiltersAC}  genres={genres}/> : <h1>loading</h1>}
        </>
    )
}

const mapStateToProps = (store:any) => ({
    genres: getGenres(store),
    filters: getFilters(store),
    page: getPage(store),
    blocklist: getBlockList(store)
})
const mapDispatchToProps = {
    setFiltersAC,
    setPageAC,
    getMovieThunk
}

export default connect(mapStateToProps,mapDispatchToProps)(FiltersContainer)
