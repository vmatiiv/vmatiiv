import React, { Suspense, useState } from 'react'
import Draggable from 'react-draggable';
import Loader from '../common/Loader';
import SuspenseImageLoader from "react-suspense-image-loader"
interface IMovieItem {
    id:number,
    title:string,
    poster_path:string,
    overview:string,
    watchLater: any,
    remove: any
}

const MovieItem = ({id,title,remove,watchLater,poster_path,overview}:IMovieItem) => {
    
    const [spiner,setSpiner] = useState(true)
    const alternative = "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fcity&psig=AOvVaw3sOjXTsG7ZmuN7YxCaSPTd&ust=1585864050101000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJiK-IyayOgCFQAAAAAdAAAAABAD"

    const imgPath =  (poster_path && `http://image.tmdb.org/t/p/w400${poster_path}`) || alternative
    // const onStart = (e:DraggableEvent,ui:any) => {

    // }
    // const onDrag = (e:DraggableEvent,ui:any) => {

    // }
    
    const onStop = (e:any,ui:any) => {
        if(ui.x>0){
            watchLater({id,title,overview,imgPath});
        }
        remove(id)

    }
    const dragEvents = {
        // onStart,
        // onDrag,
        onStop
    }
    const onScroll = (e:any) => {
      console.log(e.target.scrollTop)
    }




    return (
<>
              <Draggable  onStop={onStop}  axis="x"  position={{x:0,y:0}} allowAnyClick={true}>   
                     <div style={{overflowY:"scroll",height:"70vh",position:"absolute"}}>
                     <div >
                       
                      <Suspense fallback={<Loader/>}>
                       <img src={imgPath}  alt={title}></img>
                       <span style={{position:"absolute",bottom:"1rem",left:"1rem",color:"white"}}>
                         {title}
                       </span>
                       <p> 
                       {overview} 
                     </p>

                      </Suspense>
                     </div>
                     </div>
              </Draggable>
</>
      )
}

export default MovieItem