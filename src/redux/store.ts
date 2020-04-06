import {createStore,applyMiddleware,combineReducers} from 'redux';
import {filterReducer} from './reducers/filterReducer'
import {movieReducer} from './reducers/movieReducer'
import {watchLaterReducer} from './reducers/watchLaterReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import {persist, CACHE_KEY} from './middlewares'
import thunk from 'redux-thunk'



const cachedState = window.localStorage.getItem(CACHE_KEY);
const initialState = cachedState ? JSON.parse(cachedState) : {};
// const devtools = window.devToolsExtension ? window.devToolsExtension() : f => f;
// const middleware = compose(applyMiddleware(thunk, persist), devtools);

const reducers = combineReducers({
    filters: filterReducer(initialState.filters || {
        with_genres:[],
        years:[1980,new Date().getFullYear()],
        rate: 6

    }),
    movies: movieReducer(initialState.movies || {
        movies:[],
        page:1,
        blocklist:[]
    }),
    watchLater: watchLaterReducer(initialState.watchLater || [])
})


const middlewares = composeWithDevTools(applyMiddleware(thunk,persist ))

export default createStore(reducers,middlewares);