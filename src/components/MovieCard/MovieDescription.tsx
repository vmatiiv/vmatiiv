import React from 'react'
import Video from './Video'
import ActorsContainer from './Actors'
import { getMovies, getDirectors } from '../../selectors'
import { connect } from 'react-redux'

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

function MovieDescription({movie:{release_date,budget,revenue,runtime,genres,overview,vote_average},directors}:MovieDescription) {
    
    const directorList = directors ?  directors.map((x:any) => x.name).join(',') : null
    const genresList = genres ?  genres.map((x:any) => x.name).join(',') : null

    return (
        <div style={{margin:"1rem"}}>
                        
        <div style={{margin:"0 auto"}}> 
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
         
        </div>
    )
}
const mapStateToProps = (store:any) => ({
    movie:getMovies(store),
    directors:getDirectors(store)
})

const MovieDescriptionContainer = ({directors,movie}:any) => {
    if (!movie) return null
    return <MovieDescription movie={movie[0]} directors={directors}/>
}
export default connect(mapStateToProps)(MovieDescriptionContainer)
