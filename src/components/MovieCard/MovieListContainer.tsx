import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {getMovies, getFilters, getPage,notFound,getBlockList, isLoading} from '../../selectors'
import {getMovieThunk,removeMovieAC,getActorsThunk,getVideoThunk} from '../../redux/reducers/movieReducer'
import {addToWatchListAC} from '../../redux/reducers/watchLaterReducer'
import MovieItem from './MovieItem'
import Loader from '../common/Loader'

function MovieListContainer({getVideoThunk,getActorsThunk,page,notFound,isLoading,blocklist,movies,filters,getMovieThunk,addToWatchListAC,removeMovieAC}:any) {
    const [dragDissable,setDragDissable] = useState(false);
    useEffect(()=>{
        console.log(!movies)
        console.log(navigator.onLine)
        if( movies.length<1 && navigator.onLine ){
            getMovieThunk(blocklist,page+1,filters)
        }
        else {
            getActorsThunk(movies[0].id);
            getVideoThunk(movies[0].id);
        }
        console.log('disabled')
        setDragDissable(false)
    },[movies])

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
// dragDissable={dragDissable} setDragDissable={setDragDissable}
    if(!navigator.onLine) return <h1>no internet connection</h1> 
    if(notFound) return <h1>I can`t find movie by your filters, try to change it</h1>
    if(isLoading ) return <Loader/>
    const list = movies.map((x:any) => <MovieItem {...x} drag={false} remove={removeMovieAC} watchLater={addToWatchListAC}/>)
    return <> {list} </>
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
    getVideoThunk,
}

export default React.memo(connect(mapStateToProps,mapDispatchToProps)(MovieListContainer))
