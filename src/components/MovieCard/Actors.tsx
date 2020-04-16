import React,{useState} from 'react'
import {Swipeable} from 'react-swipeable'
import { getActors } from '../../selectors';
import { connect } from 'react-redux';

function Actors({cast}:any) {
    debugger
    const [index,setIndex] = useState(0);
    const config = {
      trackTouch: true,                      // track touch input
      trackMouse: true,  
      delta: 10,
      rotationAngle: 0,
      preventDefaultTouchmoveEvent: false,
    }

    const left = () => {
      setIndex((index+1) % cast.length)
    }

    const right = () => {
        index === 0 ? setIndex(cast.length -1) : setIndex((index-1) % cast.length)

    }

    const imgPath = `http://image.tmdb.org/t/p/w400${cast[index].profile_path}`
    return  (
        <Swipeable style={{position:"relative"}} onSwipedRight={right} onSwipedLeft={left} {...config}>
            
                <img src={imgPath} alt="gnuda"/>
                <h1 style={{position:"absolute",left:"1rem",bottom:"3rem",color:"white"}}>{cast[index].name}</h1>
                <h2 style={{position:"absolute",left:"1rem",bottom:"1rem",color:"white"}}>{cast[index].character}</h2>
            
        </Swipeable>
    )
}
const mapStateToProps = (store:any) => ({
    cast:getActors(store),
})

function ActorsContainer({cast}:any) {

    return cast ? <Actors cast={cast}/> : null
}
export default connect(mapStateToProps)(ActorsContainer)