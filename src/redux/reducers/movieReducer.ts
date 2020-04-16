import {movieDiscover,getCredits,getMovieVideos} from '../../api'
import { Dispatch } from 'redux'

interface IAction {
    type:string,
    payload:any
}
const GET_MOVIES = "GET_MOVIES"
const REMOVE_MOVIE = "REMOVE_MOVIE"
const SET_PAGE = "SET_PAGE"
const LOADING = "LOADING"
const NOT_FOUND = "NOT_FOUND"
const GET_VIDEO = "GET_VIDEO"
const GET_ACTORS = "GET_ACTORS"
export const movieReducer = (initialState:any) => (state=initialState,{type,payload}:IAction)=>{
    switch (type) {
        case GET_MOVIES:
            return {
                ...state,
                page:payload.resultPage,
                movies:[...payload.filteredList],
                isLoading:false,
                notFound:false
            }
        case GET_ACTORS :
            return {...state,actors:payload}
        case LOADING:
            return {...state,isLoading:true};
        case SET_PAGE:
            return {...state,page:1}
        case NOT_FOUND:
            return {...state,notFound:true}
        case GET_VIDEO:
            return {...state,video:payload}    
        case REMOVE_MOVIE:
            return {
                ...state,
                movies:[...state.movies.filter((x:any)=> x.id !== payload )],
                blocklist:[...state.blocklist,payload]
            }
        default:
            return state
    }
}



export const setPageAC = () => ({type:SET_PAGE})
const setNotFound = () => ({type:NOT_FOUND})

const loadingAC = () => ({type:LOADING});
export const removeMovieAC = (id:number) => ({type:REMOVE_MOVIE,payload:id})


const getActorsAC = (actors:any) => ({type:GET_ACTORS,payload:actors})
export const getActorsThunk = (id:number) => async (dispatch:Dispatch) => {
    const actors = await getCredits(id);
    debugger
    dispatch(getActorsAC(actors.data.cast.filter((x:any) => !!x.profile_path && x.order <15 && !x.character.toLowerCase().includes('(uncredited)'))))
}

const getVideoAC = (video:any) => ({type:GET_VIDEO,payload:video})
export const getVideoThunk = (id:number) => async (dispatch:Dispatch) => {
    const video = await getMovieVideos(id);
    
    dispatch(getVideoAC(video.data.results.filter((x:any)=>x.type.toLowerCase().includes('trailer') )[0]))

}




const getMoviesAC = (data:any) => ({type:GET_MOVIES,payload:data})

export const getMovieThunk = (blocklist:[number],page?:any,filters?:any) => async (dispatch:Dispatch)=>{
    dispatch(loadingAC());
    const movies = await movieDiscover(page,filters);

    if(movies.data.total_results === 0){
        return dispatch(setNotFound())
    }
    if(page > movies.data.total_pages){
        return dispatch(setNotFound())
    }
    const resultPage =  movies.data.page;
    const filteredList = movies.data.results.filter((x:any) => {
        return !blocklist.includes(x.id)
    })
    
    dispatch(getMoviesAC({resultPage,filteredList}))
}