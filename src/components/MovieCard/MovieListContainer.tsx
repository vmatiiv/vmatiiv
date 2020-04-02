import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getMovies, getFilters, getPage} from '../../selectors'
import {getMovieThunk,removeMovieAC} from '../../redux/reducers/movieReducer'
import {addToWatchListAC} from '../../redux/reducers/watchLaterReducer'
import MovieCard from './MovieList'

function MovieListContainer({page,movies,filters,getMovieThunk,addToWatchListAC,removeMovieAC}:any) {
    useEffect(()=>{
        !movies.length && getMovieThunk(page,filters)
    },[])


    useEffect(()=>{
        addLoad();   
        console.log('yep')
       })

    const addLoad = () => {

        if(movies.length  === 0){
            console.log('yip')
            getMovieThunk(page+1,filters)
        }
    }
    return(
        <> 
            {!!movies ?<MovieCard movies={movies} addToWatchListAC={addToWatchListAC} remove={removeMovieAC} getMovieThunk={getMovieThunk}/> : <h1>loading</h1>}
        </>
    )
}
const mapStateToProps = (store:any) => ({
    movies:getMovies(store),
    filters:getFilters(store),
    page:getPage(store)
})
export default connect(mapStateToProps,{getMovieThunk,addToWatchListAC,removeMovieAC})(MovieListContainer)
