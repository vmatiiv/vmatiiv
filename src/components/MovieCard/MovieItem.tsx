import React from 'react'
import Draggable, { DraggableEvent } from 'react-draggable';

interface IMovieItem {
    id:number,
    title:string,
    poster_path:string,
    overview:string,
    watchLater: any,
    remove: any
}

const MovieItem = ({id,title,remove,watchLater,poster_path,overview}:IMovieItem) => {
    const alternative = "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fcity&psig=AOvVaw3sOjXTsG7ZmuN7YxCaSPTd&ust=1585864050101000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJiK-IyayOgCFQAAAAAdAAAAABAD"

    const imgPath =  (poster_path && `http://image.tmdb.org/t/p/w400${poster_path}`) || alternative
    const onStart = (e:DraggableEvent,ui:any) => {

    }
    const onDrag = (e:DraggableEvent,ui:any) => {

    }
    const onStop = (e:DraggableEvent,ui:any) => {
        remove(id)
        if(ui.x>0){
            watchLater({id,title,overview,imgPath});
        }
    }
    const dragEvents = {
        onStart,
        onDrag,
        onStop
    }
   

    return (
<>
              <Draggable  {...dragEvents}  axis="x" position={{x:0,y:0}} allowAnyClick={true}>   
                     <div style={{overflowY:"scroll",height:"70vh",position:"absolute"}}>
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

export default MovieItem