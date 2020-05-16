import React, { useEffect } from 'react'
import Video from './Video'
import ActorsContainer from './Actors'
import { getFirstMovie, getDirectors } from '../../selectors'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { getVideoThunk,getActorsThunk } from '../../redux/reducers/movieReducer'
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
    },
    flipBack:any,
    
}

const Wrap = styled.div`
  font-size: 1rem;
  max-width: 100%;
  padding:0 1rem;
  background-color:${props => props.theme.colors.onyx};
  color:${props => props.theme.colors.persianGreen};

  a{
      position:relative;
      left:50%;
      transform:translateX(-50%);
  }
`
const  MovieDescription = ({movie:{release_date,budget,revenue,runtime,genres,overview,vote_average},directors,flipBack}:MovieDescription) => {
    const directorList = directors ?  directors.map((x:any) => x.name).join(',') : null
    const genresList = genres ?  genres.map((x:any) => x.name).join(',') : null

    return (
            <Wrap>
                <KeyboardArrowUpIcon onClick={()=>flipBack(false)}/>
                
                <div > 
                    <div>Rate : {vote_average}</div>   
                    {release_date && <div>Year: {release_date?.split('-')[0]}</div>}
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
    movie:getFirstMovie(store),
    directors:getDirectors(store)
})

const MovieDescriptionContainer = ({getVideoThunk,getActorsThunk,directors,flipBack,movie}:any) => {
    useEffect(() => {
        getActorsThunk(movie.id);
        getVideoThunk(movie.id);
    }, [movie])
    if (!movie) return null
    return <MovieDescription movie={movie} flipBack={flipBack} directors={directors}/>
}
export default connect(mapStateToProps,{getActorsThunk,getVideoThunk})(React.memo(MovieDescriptionContainer))
