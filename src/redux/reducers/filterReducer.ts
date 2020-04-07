import { Dispatch } from "redux"
import {getGenres} from '../../api'
interface IAction {
    type:string,
    payload:any
}

interface Idata {
    "release_date.gte"?: string,
    "release_date.lte"?: string,
    sortBy ?: string,
    with_people?: string,
    "runtume.gte" ?: number,
    "runtime.lte" ?:number,
    with_genres? : string,
}

const SET_FILTERS = "SET_FILTERS"
const GET_GENRES = "GET_GENRES"
export const filterReducer = (initialState:any) => (state=initialState,action:IAction)=>{
    switch (action.type) {
        case SET_FILTERS:
            return {...state,...action.payload}
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
export const setFiltersAC = (filters:Idata) => ({type:SET_FILTERS,payload:{...filters}})


