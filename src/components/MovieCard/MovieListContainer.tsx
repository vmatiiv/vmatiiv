import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getMovies, getFilters, getPage,notFound,getBlockList, isLoading} from '../../selectors'
import {getMovieThunk,removeMovieAC,getActorsThunk,getVideoThunk} from '../../redux/reducers/movieReducer'
import {addToWatchListAC} from '../../redux/reducers/watchLaterReducer'
import MovieItem from './MovieItem'
import Loader from '../common/Loader'

function MovieListContainer({getVideoThunk,getActorsThunk,page,notFound,isLoading,blocklist,movies,filters,getMovieThunk,addToWatchListAC,removeMovieAC}:any) {
    useEffect(()=>{
        if( !movies ){
            console.log('yip')
            getMovieThunk(blocklist,page+1,filters)
        }
        else {
            getActorsThunk(movies.id);
            getVideoThunk(movies.id);
        }
    })

    const handleKeys = (e:any) => {
        switch (e.key){
            case 'ArrowRight':
                try{
                addToWatchListAC({
                    id:movies.id,
                    title:movies.title,
                    overview:movies.overview,
                    imgPath:movies.poster_path})
                removeMovieAC(movies.id)
            }catch{} break
            case 'ArrowLeft':
                try{
                    removeMovieAC(movies.id)
                }catch{} break 
            }
            
      }

    useEffect(()=>{
        document.addEventListener('keydown',handleKeys)
        return () => document.removeEventListener('keydown',handleKeys)
      })

    if(notFound) return <h1>not found movie by your query</h1>
    if(isLoading ) return <Loader/>
    return <MovieItem {...movies} remove={removeMovieAC} watchLater={addToWatchListAC}  />
}
const mapStateToProps = (store:any) => ({
    movies:getMovies(store),
    filters:getFilters(store),
    page:getPage(store),
    blocklist:getBlockList(store),
    isLoading:isLoading(store),
    notFound:notFound(store),
})
const mapDispatchToProps = {
    getMovieThunk,
    addToWatchListAC,
    removeMovieAC,
    getActorsThunk,
    getVideoThunk
}

export default connect(mapStateToProps,mapDispatchToProps)(MovieListContainer)
