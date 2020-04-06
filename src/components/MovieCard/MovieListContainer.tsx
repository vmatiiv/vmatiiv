import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getMovies, getFilters, getPage, filteredMovies} from '../../selectors'
import {getMovieThunk,removeMovieAC} from '../../redux/reducers/movieReducer'
import {addToWatchListAC} from '../../redux/reducers/watchLaterReducer'
import MovieCard from './MovieList'
import Loader from '../common/Loader'


function MovieListContainer({page,movies,filters,getMovieThunk,addToWatchListAC,removeMovieAC}:any) {
    useEffect(()=>{
        !movies.length && getMovieThunk(page,filters)
    },[])


    useEffect(()=>{
        addLoad();   
        console.log('yep')
    },[movies])

    const addLoad = () => {
        if(movies.length  === 4){
            console.log('yip')
            getMovieThunk(page+1,filters)
        }
    }
    return(
        <> 
            {!!movies ?<MovieCard movies={movies} addToWatchListAC={addToWatchListAC} remove={removeMovieAC} getMovieThunk={getMovieThunk}/> : <Loader/>}
        </>
    )
}
const mapStateToProps = (store:any) => ({
    // movies:getMovies(store),
    filters:getFilters(store),
    page:getPage(store),
    movies:filteredMovies(store)
})
const mapDispatchToProps = {
    getMovieThunk,
    addToWatchListAC,
    removeMovieAC
}

export default connect(mapStateToProps,mapDispatchToProps)(MovieListContainer)
