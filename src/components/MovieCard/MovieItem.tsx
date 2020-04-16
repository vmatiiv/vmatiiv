import React, {  useState, useRef } from 'react'
import Draggable, { DraggableEvent } from 'react-draggable';
// import Loader from '../common/Loader';
import alternative from '../../alternative.jpg'
import Img from '../common/Img';
import styled from 'styled-components'
import ActorsContainer from './Actors';
import Video from './Video';
import ProgressiveImage from 'react-progressive-image'
interface IMovieItem {
    id:number,
    title:string,
    poster_path:string,
    overview:string,
    watchLater: any,
    remove: any,
    vote_average?: number,
    release_date?: string,
    genre_ids: Array<number>,
    vote_count?: number


}
const Wrapper = styled.div<{scrollable:boolean}>`
  position:relative;
  touch-action:pan-y !important;

  overflow-x:hidden;
  overflow-y:${props => props.scrollable ? 'scroll' : 'hidden'};
  height:95vh;
  margin: 0 auto;
  min-width: 360px;
  max-width: 600px;
  .image{
    height:${props => props.scrollable ? '80%' : '100%'};
  }
  
`
const Image = styled.img<{isLoading:boolean}>`
    width:100%;
    height:100%;
    object-position: center;
    filter: ${props => props.loading ? 'blur(10px)' : 'none'};
    overflow:hidden;
    border-radius: 20px  20px 0 0;
`

const MovieItem = ({id,genre_ids,vote_average,vote_count,release_date,title,remove,watchLater,poster_path,overview}:IMovieItem) => {
    const [dragDissable,setDragDissable] = useState(false);
    
    // const im = useRef<HTMLImageElement>(document.createElement("img"))
    const wrapper = useRef<HTMLDivElement>(document.createElement('div'))
    const imgPath =  (poster_path && `http://image.tmdb.org/t/p/original${poster_path}`) || alternative
    const tinyImage =  (poster_path && `http://image.tmdb.org/t/p/w200${poster_path}`) || alternative

    
    const onStop = (e:DraggableEvent,ui:any) => {
      if(ui.x > 150){
        watchLater({id,title,overview,imgPath})
        remove(id)
      }else if (ui.x<-150){
        remove(id)
      } 
    }

    const dragEvents = {
        onStop
    }
    const onClick = (e:any) => {  
      console.log('clicked')
      setDragDissable(true);
    }

    const dragEnableClick = (e:any) => {
      e.stopPropagation()
      wrapper.current.scroll(0,0);
      setDragDissable(false)
    }
    const onError = (e:any) => {
      e.target.src = alternative;
      
    }
    return (

              <Draggable axis="x"  {...dragEvents} position={{x:0,y:0}} disabled={dragDissable}  >
               
                     <Wrapper ref={wrapper} onClick={onClick}  scrollable={dragDissable}  >
                    
                      <div className='image' style={{position:"relative"}}>
                      <ProgressiveImage src={imgPath} placeholder={tinyImage}>
                        {(src:string,loading:boolean) => <Image onError={onError} src={src} isLoading={loading} alt={title} />}
                        
                      </ProgressiveImage>
                      {dragDissable &&  <button onClick={dragEnableClick} style={{position:"absolute",right:"1rem",bottom:"1rem"}}>click</button>}
                      
                      </div>
                      <div>id: {id}</div>
                      <div>genre_ids: {genre_ids}</div>
                      <div>release_date: {release_date}</div>
                      <div>vote_count: {vote_count}</div>
                      <div>vote_average: {vote_average}</div>
   
                         <div> 
                        <ActorsContainer/>
                        </div>
                        <div>
                          <Video/>
                        </div>
                       <p>
                       {overview} 
                     </p>

                     {dragDissable && <div style={{position:"absolute",left:"1rem",bottom:"1rem"}}>camon</div>}

                     </Wrapper>


              </Draggable>
            
      )
}

export default MovieItem
