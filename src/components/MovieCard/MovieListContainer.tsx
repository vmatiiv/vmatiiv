import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getMovies, getFilters, getPage,notFound,getLength,getBlockList, isLoading} from '../../selectors'
import {getMovieThunk,removeMovieAC} from '../../redux/reducers/movieReducer'
import {addToWatchListAC} from '../../redux/reducers/watchLaterReducer'
import MovieItem from './MovieItem'
import styled from 'styled-components'
import Loader from '../common/Loader'

const Some = styled.div`
    position:relative;
    width:100%;
    max-width: 360px;
    max-height: 90%;
    height:700px;
    margin:0.3rem 0.5rem;
    overflow:visible;
`
const Empty = styled.div`
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
`
function MovieListContainer({length,page,notFound,isLoading,blocklist,movies,filters,getMovieThunk,addToWatchListAC,removeMovieAC}:any) {
    
    useEffect(()=>{
        if( length < 3 ){
            getMovieThunk(blocklist,page+1,filters)
        }
    },[length])



    if(!navigator.onLine) return <Empty><h1>no internet connection</h1></Empty> 
    if(notFound) return <Empty><h1>I can`t find movie by your filters, try to change it</h1></Empty>
    if(!movies.length) return null

    const list = movies.map((x:any,i:number) => <MovieItem key={x.id} index={i}  loading={isLoading} {...x}  remove={removeMovieAC} watchLater={addToWatchListAC}/>)
    return <Some> {list} </Some>

}
const mapStateToProps = (store:any) => ({
    movies:getMovies(store),
    filters:getFilters(store),
    page:getPage(store),
    blocklist:getBlockList(store),
    isLoading:isLoading(store),
    notFound:notFound(store),
    length: getLength(store)
}) 
const mapDispatchToProps = {
    getMovieThunk,
    addToWatchListAC,
    removeMovieAC,
}

export default connect(mapStateToProps,mapDispatchToProps)(MovieListContainer)
