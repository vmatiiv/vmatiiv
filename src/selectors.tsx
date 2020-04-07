import { createSelector } from 'reselect'
export const getFilters = (store:any) => store.filters 
export const getGenres = (store:any) => store.filters.genres
export const getWatchLaterMovies = (store:any) => store.watchLater
export const getMovies = (store:any) => store.movies.movies
export const getPage = (store:any) => store.movies.page
export const getBlockList = (store:any) => store.movies.blocklist
export const isLoading = (store:any) => store.movies.isLoading
export const filteredMovies = createSelector(getMovies,getBlockList,(items,blockList)=>{ console.log(blockList); return items.filter((x:any) => !(x.id in blockList))});