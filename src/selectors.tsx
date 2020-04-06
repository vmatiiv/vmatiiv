import { createSelector } from 'reselect'
export const getFilters = (store:any) => store.filters 
export const getGenres = (store:any) => store.movies.genres
export const getWatchLaterMovies = (store:any) => store.watchLater
export const getMovies = (store:any) => store.movies.movies
export const getPage = (store:any) => store.movies.page


export const filteredMovies = createSelector(getMovies,items=>items.filter((x:any) => x.id !== 399121));