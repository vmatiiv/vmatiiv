import {getGenres,movieDiscover} from '../../api'
import { Dispatch } from 'redux'

interface IAction {
    type:string,
    payload:any
}
const GET_GENRES = "GET_GENRES"
const GET_MOVIES = "GET_MOVIES"
const REMOVE_MOVIE = "REMOVE_MOVIE"
const SET_PAGE = "SET_PAGE"
export const movieReducer = (initialState:any) => (state=initialState,action:IAction)=>{
    switch (action.type) {
        case GET_MOVIES:
            return {
                ...state,
                page:action.payload.page,
                movies:[...action.payload.results,...state.movies]
            }

        case GET_GENRES:
            return {...state,genres:[...action.payload]}
        case SET_PAGE:
            return {...state,page:1}
        case REMOVE_MOVIE:

            console.log(state.movies.filter((x:any)=> x.id !== action.payload ))
            
            return {...state,movies:[...state.movies.filter((x:any)=> x.id !== action.payload )]}
        default:
            return state
    }
}



export const setPageAC = () => ({type:SET_PAGE})
const getGenresAC = (genres:any) => ({type:GET_GENRES,payload:[...genres]})

export const getGenresThunk = () => async (dispatch:Dispatch)=> {
    const genres = await getGenres();
    dispatch(getGenresAC(genres.data.genres))
}

export const removeMovieAC = (id:number) => ({type:REMOVE_MOVIE,payload:id})

const getMoviesAC = (data:any) => ({type:GET_MOVIES,payload:data})

export const getMovieThunk = (page?:any,filters?:any) => async (dispatch:Dispatch)=>{
    const movies = await movieDiscover(page,filters);
    dispatch(getMoviesAC(movies.data))
}