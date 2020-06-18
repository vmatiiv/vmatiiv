import {movieDiscover,getCredits,getMovieVideos,getMovieDetails} from '../../api'
import { Dispatch } from 'redux'

interface IAction {
    type:string,
    payload:any
}
const GET_MOVIES = "GET_MOVIES"
const REMOVE_MOVIE = "REMOVE_MOVIE"
const GET_MOVIES_WITH_FILTERS = "GET_MOVIES_WITH_FILTERS"
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
                movies:[...state.movies,...payload.filteredList],
                isLoading:false,
                notFound:false
            }
        case GET_MOVIES_WITH_FILTERS: 
            return {
                ...state,
                movies:[...payload.filteredList],
                notFound:false
            }
        case GET_ACTORS :
            return {...state,
                actors:payload.actorsList,
                directors:payload.Director}
        case LOADING:
            return {...state,isLoading:payload};

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



const setNotFound = () => ({type:NOT_FOUND})

const loadingAC = (loading:boolean) => ({type:LOADING,payload:loading});
export const removeMovieAC = (id:number) => ({type:REMOVE_MOVIE,payload:id})

const getActorsAC = (actors:any) => ({type:GET_ACTORS,payload:actors})
export const getActorsThunk = (id:number) => async (dispatch:Dispatch) => {
    try {
        const actors = await getCredits(id);
        const filteredList = 
            (actors.data.cast.filter((x:any) => !!x.profile_path && !x.character.toLowerCase().includes('(uncredited)')).slice(0,15))
        const actorsList = filteredList.length === 0 ? null : filteredList
        const Director = actors.data.crew.filter((x:any)=> x.job.toLowerCase().match(/^director$/g))
        dispatch(getActorsAC({actorsList ,Director}))    
        
    } catch (error) {

        dispatch(getActorsAC(null))  

    }
}

const getVideoAC = (video:any) => ({type:GET_VIDEO,payload:video})
export const getVideoThunk = (id:number) => async (dispatch:Dispatch) => {
    try {
        const video = await getMovieVideos(id);
        dispatch(getVideoAC(video.data.results.filter((x:any)=>x.type.toLowerCase().includes('trailer') )[0] ))
            
    } catch (error) {
        dispatch(getVideoAC(null ))

    }

}



const getMoviesAC = (data:any) => ({type:GET_MOVIES,payload:data})

export const getMovieThunk = (blocklist:[number],page?:any,filters?:any) => async (dispatch:Dispatch)=>{
    dispatch(loadingAC(true));
    try {
        const movies = await movieDiscover(page,filters);

        if(movies.data.total_results === 0){
            return dispatch(setNotFound())
        }
        if(page > movies.data.total_pages){
            return dispatch(setNotFound())
        }
        const resultPage =  movies.data.page;
        const list =  movies.data.results
          .filter((x:any) => {
              return !blocklist.includes(x.id)
          })
          .map(async (x:any) =>{
              const z = await getMovieDetails(x.id); 
              return z.data
          })
        Promise.all(list).then(filteredList=>dispatch(getMoviesAC({resultPage,filteredList})))
            
    } catch (error) {
        dispatch(loadingAC(false))
    }
    

}

const getMoviesWithFiltersAC = (data:any) => ({type:GET_MOVIES_WITH_FILTERS,payload:data})

export const getMoviesWithFiltersThunk = (blocklist:[number],page?:any,filters?:any) => async (dispatch:Dispatch)=>{
    dispatch(loadingAC(true));
    try {
        const movies = await movieDiscover(page,filters);

        if(movies.data.total_results === 0){
            return dispatch(setNotFound())
        }
        if(page > movies.data.total_pages){
            return dispatch(setNotFound())
        }

        const resultPage =  movies.data.page;
        const list =  movies.data.results
          .filter((x:any) => {
              return !blocklist.includes(x.id) && x.poster_path
          })
          .map(async (x:any) =>{
              const z = await getMovieDetails(x.id); 
              return z.data
          })
        Promise.all(list).then(filteredList=>dispatch(getMoviesWithFiltersAC({resultPage,filteredList})))
            
    } catch (error) {
        dispatch(loadingAC(false))
    }
    

}