
const ADD_TO_WATCH_LIST = "ADD_TO_WATCH_LIST"
const REMOVE_FROM_WATCH_LIST = "REMOVE_FROM_WATCH_LIST"


export const watchLaterReducer = (initialState:any) => (state=initialState,action:{type:string,payload?:any})=>{
    switch (action.type) {
        case ADD_TO_WATCH_LIST:


            return [...state,action.payload]
            // return state
        case REMOVE_FROM_WATCH_LIST:
            // console.log(...);
            return [...state.filter(( x:any ) => x.id !== action.payload )]
            // return state
        default:
            return state
    }
}






export const addToWatchListAC = (data:any) =>({type:ADD_TO_WATCH_LIST,payload:data}); 
export const removeFromWatchListAC = (id:any) => ({type:REMOVE_FROM_WATCH_LIST,payload:id});