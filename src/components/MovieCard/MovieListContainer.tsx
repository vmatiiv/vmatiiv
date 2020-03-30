import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getMovies, getFilters} from '../../selectors'
import {getMovieThunk} from '../../redux/reducers/movieReducer'
import {addToWatchListAC} from '../../redux/reducers/watchLaterReducer'
import MovieCard from './MovieList'

function MovieListContainer({movies,filters,getMovieThunk,addToWatchListAC}:any) {
    useEffect(()=>{
        getMovieThunk(1,filters)
    },[filters])
    return(
        <> 
            {!!movies ?<MovieCard movies={movies} addToWatchListAC={addToWatchListAC} getMovieThunk={getMovieThunk}/> : <h1>loading</h1>}
        </>
    )
}
const mapStateToProps = (store:any) => ({
    movies:getMovies(store),
    filters:getFilters(store)
})
export default connect(mapStateToProps,{getMovieThunk,addToWatchListAC})(MovieListContainer)
