import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getMovies, getFilters, getPage,notFound,getBlockList, isLoading, getNextImage} from '../../selectors'
import {getMovieThunk,removeMovieAC,getActorsThunk,getVideoThunk} from '../../redux/reducers/movieReducer'
import {addToWatchListAC} from '../../redux/reducers/watchLaterReducer'
import MovieItem from './MovieItem'
import styled from 'styled-components'

const Some = styled.div`
    position:relative;
    width:100%;
    max-width: 375px;
    max-height: 95vh;
    height: 667px;
`

function MovieListContainer({getVideoThunk,nextImage,getActorsThunk,page,notFound,isLoading,blocklist,movies,filters,getMovieThunk,addToWatchListAC,removeMovieAC}:any) {
    
    useEffect(()=>{
        if( movies.length<3 && navigator.onLine ){
            getMovieThunk(blocklist,page+1,filters)
        }
        else {
            getActorsThunk(movies[0].id);
            getVideoThunk(movies[0].id);
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
                // case 'ArrowUp':{
                //     window.history.pushState('/description')
                //     break
                // }
                // case 'ArrowDown':{
                //     window.location.assign('/')
                //     break
                // }
            }
                
                
          }
        document.addEventListener('keydown',handleKeys)
        return () => document.removeEventListener('keydown',handleKeys)
      })

    if(!navigator.onLine) return <h1>no internet connection</h1> 
    if(notFound) return <h1>I can`t find movie by your filters, try to change it</h1>
    // if(isLoading) return <Loader/>




// dragDissable={dragDissable} setDragDissable={setDragDissable}
    // const list = movies.map((x:any) => <MovieItem key={x.id} nextImage={nextImage} loading={isLoading} {...x}  remove={removeMovieAC} watchLater={addToWatchListAC}/>)
    // return <Some> {list} </Some>
    return (
    //     // <Suspense fallback={<Loader/>}>
        <Some>
            <MovieItem {...movies[1]} loading={isLoading} nextImage={nextImage} remove={removeMovieAC} watchLater={addToWatchListAC}/>
            <MovieItem {...movies[0]} loading={isLoading} nextImage={nextImage} remove={removeMovieAC} watchLater={addToWatchListAC}/>
         </Some>
        //     // {/* </Suspense> */}
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
