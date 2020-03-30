import React from 'react'
import { connect } from 'react-redux'
import {getGenres, getFilters} from '../../selectors'
import {getMovieThunk} from '../../redux/reducers/movieReducer'
import {setFiltersAC} from '../../redux/reducers/filterReducer'
import Filters from './Filters'



function FiltersContainer({filters,setFiltersAC,genres,history}:any) {

    return (  <>
        { !!genres ? <Filters filters={filters}  setFilters={setFiltersAC} back={history.goBack} genres={genres}/> : <h1>loading</h1>}
        </>
    )
}

const mapStateToProps = (store:any) => ({
    genres: getGenres(store),
    filters: getFilters(store)
})

export default connect(mapStateToProps,{setFiltersAC})(FiltersContainer)
