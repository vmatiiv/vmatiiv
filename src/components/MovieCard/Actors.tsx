import React,{useState, useEffect} from 'react'
import {Swipeable} from 'react-swipeable'
import { getActors } from '../../selectors';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Img from '../common/Img';

const Wrapper = styled.div`
    position:relative;
    margin:1rem;
    .character{
        position:absolute;
        width:100%;
        background-color: rgba(0,0,0,0.5);
        left:0;
        bottom:0;
        color:white;
        margin:0;
        h3,h4{
            padding:0 1rem;
        }
    }
`
const Actors = React.memo(({cast,index,handleRight,handleLeft}:any) => {

    const config = {
        trackTouch: true,                      // track touch input
        trackMouse: true,  
        delta: 10,
        rotationAngle: 0,
        preventDefaultTouchmoveEvent: true,
      }


    return  (
        <Wrapper>
            <Swipeable onSwipedRight={handleRight} onSwipedLeft={handleLeft} {...config}>
                <Img src={cast[index].profile_path} alt={cast[index].name}/>

                <div className='character'>
                    <h3>{cast[index].character}</h3>
                    <h4>{cast[index].name}</h4>
                </div>

            </Swipeable>
        </Wrapper>
    )
})
const mapStateToProps = (store:any) => ({
    cast:getActors(store),
})

function ActorsContainer({cast}:any) {
    const [index,setIndex] = useState(0);

    useEffect(()=>{
        setIndex(0)
    },[cast])

    const handleLeft = (e:any) => {
      setIndex((index+1) % cast.length)
    }

    const handleRight = (e:any) => {
        index === 0 ? setIndex(cast.length -1) : setIndex((index-1) % cast.length)
    }
    return cast ? <Actors cast={cast} index={index} handleLeft={handleLeft} handleRight={handleRight}/> : null
}
export default connect(mapStateToProps)(ActorsContainer)