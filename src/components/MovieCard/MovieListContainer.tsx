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
    max-width: 360px;
    max-height: 90%;
    height:700px;
    margin:0.3rem 0.5rem;
    overflow:visible;
`

function MovieListContainer({getVideoThunk,getActorsThunk,page,notFound,isLoading,blocklist,movies,filters,getMovieThunk,addToWatchListAC,removeMovieAC}:any) {
    
    useEffect(()=>{
        if( movies.length<3 && navigator.onLine ){
            getMovieThunk(blocklist,page+1,filters)
        }
    },[movies])



    if(!navigator.onLine) return <h1>no internet connection</h1> 
    if(notFound) return <h1>I can`t find movie by your filters, try to change it</h1>
    if(!movies.length) return null
    // if(isLoading) return <Loader/>



    const nextMovie = {
        image: movies[1].poster_path,
        title: movies[1].title,
    }
// dragDissable={dragDissable} setDragDissable={setDragDissable}
    const list = movies.map((x:any) => <MovieItem key={x.id}  loading={isLoading} {...x}  remove={removeMovieAC} watchLater={addToWatchListAC}/>)
    // return <Some> {list} </Some>
    return (
        <Some>
    {/* {list} */}
 

            {/* <MovieItem {...movies[1]} loading={isLoading} nextImage={nextImage} remove={removeMovieAC} watchLater={addToWatchListAC}/> */}
            <MovieItem {...movies[0]} nextMovie={nextMovie} loading={isLoading} remove={removeMovieAC} watchLater={addToWatchListAC}/>
         </Some>
        )  
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

export default connect(mapStateToProps,mapDispatchToProps)(MovieListContainer)
