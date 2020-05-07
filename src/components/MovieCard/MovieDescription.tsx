import React, { useEffect } from 'react'
import Video from './Video'
import ActorsContainer from './Actors'
import { getMovies, getDirectors } from '../../selectors'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getActorsThunk, getVideoThunk } from '../../redux/reducers/movieReducer'
import { Transition} from 'react-transition-group';


interface MovieDescription{
    directors:any,
    movie:{    
        release_date?: string,
        budget:number,
        genres:any,
        runtime:number,
        vote_average: number,
        revenue:number,
        overview:string,
    }
}

const Wrap = styled.div`
  position:relative;
  overflow:auto;
  font-size: 1rem;
  box-shadow: 3px 2px 32px 4px rgba(0,0,0,0.48);
  max-width: 375px;
  height: 667px;
  background-color:black;
  /* max-height: calc(100vh - 99px); */
  margin: 0 auto;
  color:white;
  
`
function MovieDescription({movie:{release_date,budget,revenue,runtime,genres,overview,vote_average},directors}:MovieDescription) {
    
    const directorList = directors ?  directors.map((x:any) => x.name).join(',') : null
    const genresList = genres ?  genres.map((x:any) => x.name).join(',') : null


    return (

            <Wrap>

            <div > 
                <Link to="/">Up</Link>
                <div>Rate : {vote_average}</div>   
                <div>Year: {release_date?.split('-')[0]}</div>
                {budget !== 0 && 
                 <>
                  <div>Budget: {`${budget}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}$</div>
                  {revenue !== 0 && <div>Revenue: {`${revenue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}$</div>}
                 </>}
                
                
                <div>Genres: {genresList}</div>
                <div>Directors: {directorList}</div>
                <div>Runtime: {runtime}min</div>
             </div>

                <p>
                 {overview} 
                </p>
                
               <ActorsContainer/>
               <Video/>
                
            </Wrap>
       
    )
}
const mapStateToProps = (store:any) => ({
    movie:getMovies(store),
    directors:getDirectors(store)
})

const MovieDescriptionContainer = ({directors,movie,getActorsThunk,getVideoThunk}:any) => {
    // useEffect(()=>{
    //     getActorsThunk(movie.id);
    //     getVideoThunk(movie.id);
    // },[])

    if (!movie) return null
    return <MovieDescription movie={movie} directors={directors}/>
}
export default connect(mapStateToProps,{getActorsThunk,getVideoThunk})(MovieDescriptionContainer)
