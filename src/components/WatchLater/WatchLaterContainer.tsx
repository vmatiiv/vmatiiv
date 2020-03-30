import React from 'react'
import { connect } from 'react-redux'
import WatchLater from './WatchLater'
import { getWatchLaterMovies } from '../../selectors'
import {removeFromWatchListAC} from '../../redux/reducers/watchLaterReducer'
function WatchLaterContainer({movies,removeFromWatchListAC}:any) {
    return (
        <WatchLater movies={movies} remove={removeFromWatchListAC}/>
    )
}
const mapStateToProps = (store:any) => ({
    movies: getWatchLaterMovies(store) 
})

export default connect(mapStateToProps,{removeFromWatchListAC})(WatchLaterContainer)
