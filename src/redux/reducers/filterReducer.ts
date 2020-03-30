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

        default:
            return state
    }
}


export const setFiltersAC = (filters:Idata) => ({type:SET_FILTERS,payload:{...filters}})


