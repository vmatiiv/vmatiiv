import React, { DragEvent } from 'react'
import Draggable, { DraggableEvent } from 'react-draggable';
import {Link} from 'react-router-dom'
function MovieList({movies,addToWatchListAC,getMovieThunk}:any) {
    
    const list = movies.map((x:any)=> <MovieItem key={x.id} {...x} watchLater={addToWatchListAC} />)   
    
    return (
        <div>
            <div style={{display:"flex",justifyContent:"space-around"}}>
                <Link to="/watch-later">later</Link>
                <Link to="/filters">filters</Link>
            </div>
            {list}
        </div>
    )
}

export default MovieList



interface IMovieItem {
    id:number,
    title:string,
    poster_path:string,
    overview:string,
    watchLater: any
}

const MovieItem = ({id,title,watchLater,poster_path,overview}:IMovieItem) => {
    console.log(poster_path)
    const onStart = (e:DraggableEvent,ui:any) => {
        console.log(ui)
    }
    const onDrag = (e:DraggableEvent,ui:any) => {
        console.log(ui)
    }
    const onStop = (e:DraggableEvent,ui:any) => {
        watchLater({id,title,overview});
    }
    const dragEvents = {
        onStart,
        onDrag,
        onStop
    }
    const imgPath = `http://image.tmdb.org/t/p/w400${poster_path}`
    return (
            <>

              <Draggable {...dragEvents}  axis="x" position={{x:0,y:0}} allowAnyClick={true}>
                 <div >
                     <div >
                       <img src={imgPath} alt={title} />
                       <span style={{position:"absolute",bottom:"1rem",left:"1rem",color:"white"}}>
                         {title}
                       </span>
                     </div>
                     <p> 
                       {overview} 
                     </p>
    
               
                 </div>
              </Draggable>
             
            </>

    
      )
}
