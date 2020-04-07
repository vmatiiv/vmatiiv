import React, { Suspense, useState, useRef } from 'react'
import Draggable from 'react-draggable';
import Loader from '../common/Loader';
import alternative from '../../alternative.jpg'
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
    const im = useRef<HTMLImageElement>(document.createElement("img"))

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

    const onLoad = (e:any) =>{
      console.log(e.target.complete)
      setSpiner(false)
    }
    const onError = () => {
      im.current.src=alternative
      console.log(im)
  debugger
    }

    return (
<>
              <Draggable  onStop={onStop}  axis="x"  position={{x:0,y:0}} allowAnyClick={true}>   
                     <div style={{overflowY:"scroll",width:"100%",height:"100vh",textAlign:"center"}}>
                       <div>


                        {spiner && <Loader/>}
                       <img ref={im} onLoad={onLoad} onError={onError} src={imgPath}   alt={title}></img>
                       <span style={{position:"absolute",bottom:"1rem",left:"1rem",color:"white"}}>
                         {title}
                       </span>
                       <p> 
                       {overview} 
                     </p>
                     </div>


                     </div>
              </Draggable>
</>
      )
}

export default MovieItem