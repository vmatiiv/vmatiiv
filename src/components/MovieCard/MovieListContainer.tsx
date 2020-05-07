import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getMovies, getFilters, getPage,notFound,getBlockList, isLoading, getNextImage} from '../../selectors'
import {getMovieThunk,removeMovieAC,getActorsThunk,getVideoThunk} from '../../redux/reducers/movieReducer'
import {addToWatchListAC} from '../../redux/reducers/watchLaterReducer'
import MovieItem from './MovieItem'

function MovieListContainer({getVideoThunk,nextImage,getActorsThunk,page,notFound,isLoading,blocklist,movies,filters,getMovieThunk,addToWatchListAC,removeMovieAC}:any) {
    
    useEffect(()=>{
        if( !movies && navigator.onLine ){
            getMovieThunk(blocklist,page+1,filters)
        }
        else {
            getActorsThunk(movies.id);
            getVideoThunk(movies.id);
        }
    },[movies])

    useEffect(()=>{
        const handleKeys = (e:any) => {
            switch (e.key){
                case 'ArrowRight':
                    try{
                    addToWatchListAC({
                        id:movies.id,
                        title:movies.title,
                        overview:movies.overview,
                        poster_path:movies.poster_path})
                    removeMovieAC(movies.id)
                }catch{} break
                case 'ArrowLeft':
                    try{
                        removeMovieAC(movies.id)
                    }catch{} break 
                }
                
          }
        document.addEventListener('keydown',handleKeys)
        return () => document.removeEventListener('keydown',handleKeys)
      })

    if(!navigator.onLine) return <h1>no internet connection</h1> 
    if(notFound) return <h1>I can`t find movie by your filters, try to change it</h1>
    // if(isLoading) return <Loader/>




// dragDissable={dragDissable} setDragDissable={setDragDissable}
    // const list = movies.map((x:any) => <MovieItem key={x.id} {...x} drag={false} remove={removeMovieAC} watchLater={addToWatchListAC}/>)
    // return <> {list} </>
    return (
        // <Suspense fallback={<Loader/>}>
            <MovieItem {...movies} loading={isLoading} nextImage={nextImage} remove={removeMovieAC} watchLater={addToWatchListAC}/>
        // {/* </Suspense> */}
        )  
}
const mapStateToProps = (store:any) => ({
    movies:getMovies(store),
    filters:getFilters(store),
    page:getPage(store),
    blocklist:getBlockList(store),
    isLoading:isLoading(store),
    notFound:notFound(store),
    nextImage:getNextImage(store)


})
const mapDispatchToProps = {
    getMovieThunk,
    addToWatchListAC,
    removeMovieAC,
    getActorsThunk,
    getVideoThunk,
}

export default React.memo(connect(mapStateToProps,mapDispatchToProps)(MovieListContainer))
