import React from 'react'
import { connect } from 'react-redux'
import {getGenres, getFilters, getPage} from '../../selectors'
import {setPageAC,getMovieThunk} from '../../redux/reducers/movieReducer'
import {setFiltersAC} from '../../redux/reducers/filterReducer'
import Filters from './Filters'



function FiltersContainer({filters,page,setFiltersAC,setPageAC,genres,history,getMovieThunk}:any) {

    return (  <>
        { !!genres ? <Filters filters={filters} page={page} setPage={setPageAC} getMovieThunk={getMovieThunk} setFilters={setFiltersAC} back={history.goBack} genres={genres}/> : <h1>loading</h1>}
        </>
    )
}

const mapStateToProps = (store:any) => ({
    genres: getGenres(store),
    filters: getFilters(store),
    page: getPage(store)
})

export default connect(mapStateToProps,{setFiltersAC,setPageAC,getMovieThunk})(FiltersContainer)
