import React from 'react'
import Video from './Video'
import ActorsContainer from './Actors'
import { getMovies, getDirectors } from '../../selectors'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
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
  left:0;
  bottom:0;
  /* overflow:hidden; */
  font-size: 1rem;
  max-width: 100%;
  padding:0 1rem;
  background-color:${props => props.theme.colors.onyx};
  color:${props => props.theme.colors.persianGreen};
  &::-webkit-scrollbar{
        display:none;
  }
  a{
      position:relative;
      left:50%;
      transform:translateX(-50%);
  }
`
function MovieDescription({movie:{release_date,budget,revenue,runtime,genres,overview,vote_average},directors}:MovieDescription) {
    const directorList = directors ?  directors.map((x:any) => x.name).join(',') : null
    const genresList = genres ?  genres.map((x:any) => x.name).join(',') : null


    return (

            <Wrap>
                <Link to="/"><KeyboardArrowUpIcon/></Link>
                
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
    movie:getMovies(store),
    directors:getDirectors(store)
})

const MovieDescriptionContainer = ({directors,movie}:any) => {
    
    if (!movie.length) return null
    return <MovieDescription movie={movie[0]} directors={directors}/>
}
export default connect(mapStateToProps)(MovieDescriptionContainer)
