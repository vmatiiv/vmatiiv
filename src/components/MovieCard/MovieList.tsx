import React, { DragEvent } from 'react'
import Draggable, { DraggableEvent } from 'react-draggable';
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import MovieItem from './MovieItem'

const Centered = styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
`

function MovieList({movies,addToWatchListAC,getMovieThunk,remove}:any) {
    
    const list = movies.map((x:any)=> <MovieItem key={x.id} {...x} remove={remove} watchLater={addToWatchListAC} />)   
    
    return (
        <div style={{width:"60vw"}}>
            {/* <Centered> */}
                {list}
            {/* </Centered> */}
        </div>
    )
}

export default MovieList


