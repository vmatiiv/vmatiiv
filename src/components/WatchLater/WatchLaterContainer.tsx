import React from 'react'
import { connect } from 'react-redux'
import WatchLater from './WatchLater'
import { getWatchLaterMovies } from '../../selectors'
import {removeFromWatchListAC} from '../../redux/reducers/watchLaterReducer'
import styled from 'styled-components'
import {Navigation} from '../../styles'
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
const Later = styled.div`
  order:1;
  height:100%;
  width:50%;
  overflow-y:auto;
  background-color:white;
  @media (max-width:${props => props.theme.media.md}){
        background-color: ${props => props.theme.colors.mainBackground};
        width:100vw;
        position:relative;
        height:100vh;
   } 
`
const EmptyList = styled.div`
   display:flex;
   margin-top:1rem;
   justify-content:center;
`
function WatchLaterContainer({setClear,movies,removeFromWatchListAC}:any) {
    
    return (
        <Later>
            <Navigation right>
                <ViewCarouselIcon onClick={()=>setClear("-100vw")}/>
            </Navigation>
            {
                !!movies.length 
                    ? <WatchLater movies={movies}  remove={removeFromWatchListAC}/>  
                    : <EmptyList> <h1>nothing here</h1> </EmptyList>
                    
            }
        </Later>
    ) 
}
const mapStateToProps = (store:any) => ({
    movies: getWatchLaterMovies(store) 
})

const mapDispatchToProps = {
    removeFromWatchListAC
}
export default connect(mapStateToProps,mapDispatchToProps)(WatchLaterContainer)
