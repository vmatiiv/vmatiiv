import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getMovies, getFilters, getPage, filteredMovies,getBlockList, isLoading} from '../../selectors'
import {getMovieThunk,removeMovieAC} from '../../redux/reducers/movieReducer'
import {addToWatchListAC} from '../../redux/reducers/watchLaterReducer'
import MovieCard from './MovieList'
import Loader from '../common/Loader'


function MovieListContainer({page,isLoading,blocklist,movies,filters,getMovieThunk,addToWatchListAC,removeMovieAC}:any) {


    useEffect(()=>{
        if(movies.length  === 0){
            console.log('yip')
            getMovieThunk(blocklist,page+1,filters)
        }
    },[movies])
    
    if(isLoading ) return <Loader/>
    return <MovieCard movies={movies} addToWatchListAC={addToWatchListAC} remove={removeMovieAC} getMovieThunk={getMovieThunk}/>
}
const mapStateToProps = (store:any) => ({
    movies:getMovies(store),
    filters:getFilters(store),
    page:getPage(store),
    blocklist:getBlockList(store),
    isLoading:isLoading(store)
    // movies:filteredMovies(store)
})
const mapDispatchToProps = {
    getMovieThunk,
    addToWatchListAC,
    removeMovieAC
}

export default connect(mapStateToProps,mapDispatchToProps)(MovieListContainer)
