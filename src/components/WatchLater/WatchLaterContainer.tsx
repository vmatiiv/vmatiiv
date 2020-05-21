import React from 'react'
import { connect } from 'react-redux'
import WatchLater from './WatchLater'
import { getWatchLaterMovies } from '../../selectors'
import {removeFromWatchListAC} from '../../redux/reducers/watchLaterReducer'

function WatchLaterContainer({setClear,movies,removeFromWatchListAC}:any) {
<<<<<<< HEAD
    return !!movies.length ? <WatchLater setClear={setClear} movies={movies}  remove={removeFromWatchListAC}/> : <h1 style={{width:"50%"}}>nothing here</h1>
=======
    return !!movies.length ? <WatchLater setClear={setClear} movies={movies}  remove={removeFromWatchListAC}/> : <h1 style={{width:"100vw"}}>nothing here</h1>
>>>>>>> a9cc5e1ba9c1f2c12649b699dc43c939b768a611
}
const mapStateToProps = (store:any) => ({
    movies: getWatchLaterMovies(store) 
})

const mapDispatchToProps = {
    removeFromWatchListAC
}
export default connect(mapStateToProps,mapDispatchToProps)(WatchLaterContainer)
