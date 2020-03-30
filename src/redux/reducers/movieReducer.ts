import {getGenres,movieDiscover} from '../../api'
import { Dispatch } from 'redux'

interface IAction {
    type:string,
    payload:any
}
const GET_GENRES = "GET_GENRES"
const GET_MOVIES = "GET_MOVIES"

export const movieReducer = (initialState:any) => (state=initialState,action:IAction)=>{
    switch (action.type) {
        case GET_MOVIES:
            return {
                ...state,
                page:action.payload.page,
                movies:[...action.payload.results]
            }

        case GET_GENRES:
            return {...state,genres:[...action.payload]}
        default:
            return state
    }
}




const getGenresAC = (genres:any) => ({type:GET_GENRES,payload:[...genres]})

export const getGenresThunk = () => async (dispatch:Dispatch)=> {
    const genres = await getGenres();
    dispatch(getGenresAC(genres.data.genres))
}


const getMoviesAC = (data:any) => ({type:GET_MOVIES,payload:data})

export const getMovieThunk = (page?:any,filters?:any) => async (dispatch:Dispatch)=>{
    const movies = await movieDiscover(page,filters);
    
    dispatch(getMoviesAC(movies.data))

}